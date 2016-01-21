/*global CurrentUserStore */
import BaseStore from '../../stores/BaseStore';
import MessagingDispatcher from '../MessagingDispatcher';
import ConversationsStore from '../stores/ConversationsStore';
import { PUBLIC_CONVERSATION } from '../constants/ConversationConstants';

const _messages = {};
const _allMessagesLoaded = {};

const MessagesStore = Object.assign(
  new BaseStore(),
  {
    pushMessages(conversationId, messages) {
      const clonedMessages = (_messages[conversationId] || []).slice(0);

      messages.forEach((message) => {
        if (!this.isMessageExists(conversationId, message)) {
          clonedMessages.push(message);
        }
      });

      _messages[conversationId] = clonedMessages;
    },
    
    unshiftMessages(conversationId, messages) {
      const loadedMessages = messages.reverse();
      const clonedMessages = _messages[conversationId].slice(0);

      loadedMessages.forEach((loadedMessage) => clonedMessages.unshift(loadedMessage));

      _messages[conversationId] = clonedMessages;
    },
    
    updateMessage(conversationId, data) {
      const messages = _messages[conversationId] || [];

      messages.forEach((message) => {
        if (message.uuid === data.uuid) {
          if (message.read_at && !data.read_at) { //FIXME temporal fix for race condition
            delete(data.read_at);
          }
          Object.assign(message, data);
        }
      });
    },

    getMessages(conversationId) {
      return _messages[conversationId] || [];
    },

    getMessageInfo(message, conversationId) {
      const conversation = ConversationsStore.getConversation(conversationId);
      const currentUser  = CurrentUserStore.getUser();
      if (conversation.type == PUBLIC_CONVERSATION) {
        const msgAuthor = conversation.users.filter((u) => u.id === message.user_id)[0];

        return ({
          type: message.user_id === currentUser.id ? 'outgoing' : 'incoming',
          user: msgAuthor,
        });
      } else {
        const recipient = conversation.recipient;

        if (recipient.id === message.recipient_id) {
          return { type: 'outgoing', user: currentUser };
        } else {
          return { type: 'incoming', user: recipient };
        }
      }
    },

    isMessageExists(conversationId, message) {
      const messages = (_messages[conversationId] || [])
              .filter((msg) => msg.uuid === message.uuid);

      return !!messages.length;
    },

    isAllMessagesLoaded(conversationId) {
      return _allMessagesLoaded[conversationId];
    },

    sortByAsc(conversationId) {
      const clonedMessages = _messages[conversationId].slice(0);
      clonedMessages.sort((a, b) => a.id - b.id);

      _messages[conversationId] = clonedMessages;
    },
  }
);

MessagesStore.dispatchToken = MessagingDispatcher.register(({ action }) => {
  switch (action.type) {
  case 'messagesLoaded':
    MessagesStore.pushMessages(action.conversationId, action.messages);
    MessagesStore.sortByAsc(action.conversationId);
    MessagesStore.emitChange();
    break;
  case 'moreMessagesLoaded':
    _allMessagesLoaded[action.conversationId] = action.allMessagesLoaded;

    MessagesStore.unshiftMessages(action.conversationId, action.messages);
    MessagesStore.emitChange();
    break;
  case 'messagesUpdated':
    action.messages.forEach((message) => (
      MessagesStore.updateMessage(action.conversationId, message)
    ));

    MessagesStore.emitChange();
    break;
  case 'messageReceived':
    const message = Object.assign(action.message, { sendingState: null });

    if (MessagesStore.isMessageExists(action.conversationId, message)) {
      MessagesStore.updateMessage(action.conversationId, message);
    } else {
      MessagesStore.pushMessages(action.conversationId, [ message ]);
      MessagesStore.sortByAsc(action.conversationId);
    }

    MessagesStore.emitChange();
    break;
  case 'messageSubmitted':
    MessagesStore.pushMessages(action.conversationId, [ action.message ]);
    MessagesStore.emitChange();
    break;
  case 'messageSendingError':
    MessagesStore.updateMessage(action.conversationId, {
      uuid: action.uuid,
      sendingState: 'error',
    });
    MessagesStore.emitChange();
    break;
  };
});

export default MessagesStore;
