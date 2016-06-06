/*global ScrollerMixin, messagingService, TastyEvents */
import React, { createClass, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Empty from './Empty';
import ItemManager from './ItemManager';
import MessagesStore from '../../../../stores/MessagesStore';
import ConversationsStore from '../../../../stores/ConversationsStore'; // to update messageInfo
import MessageActions from '../../../../actions/MessageActions';

let savedScrollHeight = null;

const MessageList = createClass({
  propTypes: {
    conversation: PropTypes.object.isRequired,
    selectState: PropTypes.bool.isRequired,
    startSelect: PropTypes.func.isRequired,
  },
  mixins: [ ScrollerMixin ],

  getInitialState() {
    return this.getStateFromStore();
  },

  componentDidMount() {
    this.scrollToUnread();

    MessagesStore.addChangeListener(this._onStoreChange);
    ConversationsStore.addChangeListener(this._onStoreChange);
    messagingService.openConversation(this.props.conversation.id);
  },
  
  componentWillUpdate(nextProps, nextState) {
    const { messages } = this.state;

    if (messages[0] != null && nextState.messages[0] != null) {
      if (messages[0].uuid !== nextState.messages[0].uuid) {
        // Добавятся сообщения из истории
        savedScrollHeight = this.refs.scrollerPane.scrollHeight;
      }
    }
  },
  
  componentDidUpdate(prevProps, prevState) {
    const { messages } = this.state;

    if (prevState.messages[0] != null && messages[0] != null) {
      if (prevState.messages[0].uuid !== messages[0].uuid) {
        this._holdScroll(); // Подгрузились сообщения из истории
      } else if (prevState.messages.length !== messages.length) { // добавлено сообщение
        this._scrollToBottom();
      }
    } else {
      this._scrollToBottom();
    }
  },

  componentWillUnmount() {
    MessagesStore.removeChangeListener(this._onStoreChange);
    ConversationsStore.removeChangeListener(this._onStoreChange);
  },
  
  isEmpty() {
    return this.state.messages.length === 0;
  },

  handleScroll() {
    const { isAllMessagesLoaded, messages } = this.state;
    const scrollerPaneNode = this.refs.scrollerPane;

    if (scrollerPaneNode.scrollTop === 0 && !isAllMessagesLoaded) {
      MessageActions.loadMoreMessages({
        conversationId: this.props.conversation.id,
        toMessageId: messages[0].id,
      });
    }

    TastyEvents.emit(TastyEvents.keys.message_list_scrolled(), scrollerPaneNode);
  },

  getStateFromStore() {
    const { id } = this.props.conversation;

    return {
      isAllMessagesLoaded: MessagesStore.isAllMessagesLoaded(id),
      messages: MessagesStore.getMessages(id),
    };
  },
  
  _onStoreChange() {
    this.setState(this.getStateFromStore());
  },

  _scrollToBottom() {
    this.scrollList(this.refs.scrollerPane.scrollHeight);
  },

  scrollList(offset) {
    this.refs.scrollerPane.scrollTop = offset;
  },

  scrollToUnread() {
    const { messages } = this.state;
    const unread = messages.filter((msg) => {
      if (msg.read_at) {
        return false;
      }

      const info = MessagesStore.getMessageInfo(msg, this.props.conversation.id);
      return info.type === 'incoming';
    });

    if (unread.length) {
      const unreadMsgNode = findDOMNode(this.refs[this.messageKey(unread[0])]);
      if (unreadMsgNode) {
        this.scrollList(unreadMsgNode.offsetTop);
      }
    } else {
      this._scrollToBottom();
    }
  },
  
  _holdScroll() {
    this.scrollList(this.refs.scrollerPane.scrollHeight - savedScrollHeight);
    savedScrollHeight = null;
  },

  scrollToMsg(replyMessage, message) {
    const scrollTo = (msg) => {
      const msgNode = findDOMNode(this.refs[this.messageKey(msg)]);

      if (msgNode) {
        this.scrollList(msgNode.offsetTop);
        return true;
      } else {
        return false;
      }
    }

    if (!scrollTo(replyMessage)) {
      const { isAllMessagesLoaded, messages } = this.state;
      const idx = messages.indexOf(message);
      const limit = message.count_msgs_to_reply - idx + 10; // prepend previous 10 msgs

      if (!isAllMessagesLoaded) {
        MessageActions.loadMoreMessages({
          limit,
          conversationId: this.props.conversation.id,
          toMessageId: messages[0].id,
        }).then(() => scrollTo(replyMessage));
      }
    }
  },

  messageKey(msg) {
    return `${msg.id}-${msg.uuid}`;
  },

  renderMessages() {
    const { conversation } = this.props;
    const { messages } = this.state;

    return this.isEmpty()
      ? <Empty />
      : messages.map((message) => (
          <ItemManager
            conversationType={conversation.type}
            currentUserId={conversation.user_id}
            key={this.messageKey(message)}
            message={message}
            messagesCount={messages.length}
            ref={this.messageKey(message)}
            scrollToMsg={this.scrollToMsg}
            selectState={this.props.selectState}
            startSelect={this.props.startSelect}
          />));
  },

  render() {
    return (
      <div
        className="scroller scroller--dark scroller--messages"
        ref="scroller"
      >
        <div
          className="scroller__pane js-scroller-pane"
          onScroll={this.handleScroll}
          ref="scrollerPane"
        >
          <div className="messages__list" ref="messageList">
            <div className="messages__list-cell">
              {this.renderMessages()}
            </div>
          </div>
        </div>
        <div className="scroller__track js-scroller-track">
          <div className="scroller__bar js-scroller-bar" />
        </div>
      </div>
    );
  },
});

export default MessageList;
