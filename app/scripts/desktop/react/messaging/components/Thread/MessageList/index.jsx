import React, { Component, PropTypes } from 'react';
import Scroller from '../../../../components/common/Scroller';
import { findDOMNode } from 'react-dom';
import Empty from './Empty';
import ItemManager from './ItemManager';

let savedScrollHeight = null;

class MessageList extends Component {
  componentWillMount() {
    const {
      conversation,
      loadMessages,
    } = this.props;

    loadMessages(conversation.get('id'));
  }
  componentDidMount() {
    this.scrollToUnread();
  }
  componentWillUpdate(nextProps) {
    const {
      messages,
    } = this.props;

    if (messages.first() && nextProps.messages.first()) {
      if (messages.first() !== nextProps.messages.first()) {
        // Добавятся сообщения из истории
        savedScrollHeight = this.refs.scroller.refs.scrollerPane.scrollHeight;
      }
    }
  }
  componentDidUpdate(prevProps) {
    const {
      messages,
    } = this.props;

    if (prevProps.messages.first() && messages.first()) {
      if (prevProps.messages.first() !== messages.first()) {
        this.holdScroll(); // Подгрузились сообщения из истории
      } else if (prevProps.messages.count() !== messages.count()) { // добавлено сообщение
        this.scrollToBottom();
      }
    } else {
      this.scrollToBottom();
    }
  }
  handleScroll() {
    const {
      conversation,
      loadArchivedMessages,
    } = this.props;

    const scrollerPaneNode = this.refs.scroller.refs.scrollerPane;

    if (scrollerPaneNode.scrollTop === 0) {
      loadArchivedMessages(conversation.get('id'));
    }
  }
  scrollToBottom() {
    this.scrollList(this.refs.scroller.refs.scrollerPane.scrollHeight);
  }
  scrollList(offset) {
    this.refs.scroller.refs.scrollerPane.scrollTop = offset;
  }
  scrollToUnread() {
    const {
      conversation,
      messages,
    } = this.props;
    const unread = messages
      // only unread incoming messages
      .filter((msg) => (
        msg.get('userId') !== conversation.get('userId') && !msg.get('readAt')
      ));

    if (unread.count() > 0) {
      const unreadMsgNode = findDOMNode(this.refs[this.messageKey(unread.first())]);
      if (unreadMsgNode) {
        this.scrollList(unreadMsgNode.offsetTop);
      }
    } else {
      this.scrollToBottom();
    }
  }
  holdScroll() {
    this.scrollList(this.refs.scroller.refs.scrollerPane.scrollHeight - savedScrollHeight);
    savedScrollHeight = null;
  }
  messageKey(msg) {
    return `${msg.get('id')}-${msg.get('uuid')}`;
  }
  renderMessages() {
    const {
      conversation,
      isSelectState,
      messages,
      startSelect,
      selectedIds,
    } = this.props;

    return messages.count() === 0
      ? <Empty />
      : messages.map((message) => (
          <ItemManager
            conversation={conversation}
            isSelectState={isSelectState}
            isSelected={selectedIds.includes(message.get('id', false))}
            key={this.messageKey(message)}
            message={message}
            messagesCount={messages.count()}
            ref={this.messageKey(message)}
            startSelect={startSelect}
          />)).valueSeq();
  }
  render() {
    return (
      <Scroller
        className="scroller--messages"
        onScroll={this.handleScroll.bind(this)}
        ref="scroller"
      >
        <div className="messages__list" ref="messageList">
          <div className="messages__list-cell">
            {this.renderMessages()}
          </div>
        </div>
      </Scroller>
    );
  }
}

MessageList.propTypes = {
  conversation: PropTypes.object.isRequired,
  isSelectState: PropTypes.bool.isRequired,
  loadArchivedMessages: PropTypes.func.isRequired,
  loadMessages: PropTypes.func.isRequired,
  messages: PropTypes.object.isRequired,
  selectedIds: PropTypes.object.isRequired,
  startSelect: PropTypes.func.isRequired,
};

export default MessageList;
