/*global ScrollerMixin, MessagesStore, messagingService, MessageActions, 
 TastyEvents, MessagesPopup_ThreadMessageListItemManager */
import React, { createClass, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import MessagesPopupThreadMessageListEmpty from './MessagesPopupThreadMessageListEmpty';

let savedScrollHeight = null;

const MessagesPopupThreadMessageList = createClass({
  propTypes: {
    conversationId: PropTypes.number.isRequired,
  },
  mixins: [ ScrollerMixin ],

  getInitialState() {
    return this.getStateFromStore();
  },

  componentDidMount() {
    this.scrollToUnread();

    MessagesStore.addChangeListener(this._onStoreChange);
    messagingService.openConversation(this.props.conversationId);
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
  },
  
  isEmpty() {
    return this.state.messages.length === 0;
  },

  handleScroll() {
    const { isAllMessagesLoaded, messages } = this.state;
    const scrollerPaneNode = this.refs.scrollerPane;

    if (scrollerPaneNode.scrollTop === 0 && !isAllMessagesLoaded) {
      MessageActions.loadMoreMessages({
        conversationId: this.props.conversationId,
        toMessageId: messages[0].id,
      });
    }

    TastyEvents.emit(TastyEvents.keys.message_list_scrolled(), scrollerPaneNode);
  },

  getStateFromStore() {
    const { conversationId } = this.props;

    return {
      isAllMessagesLoaded: MessagesStore.isAllMessagesLoaded(conversationId),
      messages: MessagesStore.getMessages(conversationId),
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

      const info = MessagesStore.getMessageInfo(msg, this.props.conversationId);
      return info.type === 'incoming';
    });

    if (unread.length) {
      const unreadMsgNode = findDOMNode(this.refs[this.messageKey(unread[0])]);
      this.scrollList(unreadMsgNode.offsetTop);
    } else {
      this._scrollToBottom();
    }
  },
  
  _holdScroll() {
    this.scrollList(this.refs.scrollerPane.scrollHeight - savedScrollHeight);
    savedScrollHeight = null;
  },

  messageKey(msg) {
    return `${msg.id}-${msg.uuid}`;
  },

  renderMessages() {
    const { messages } = this.state;

    return this.isEmpty()
      ? <MessagesPopupThreadMessageListEmpty />
      : messages.map((message) => (
          <MessagesPopup_ThreadMessageListItemManager
            key={this.messageKey(message)}
            message={message}
            messagesCount={messages.length}
            ref={this.messageKey(message)}
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

export default MessagesPopupThreadMessageList;
