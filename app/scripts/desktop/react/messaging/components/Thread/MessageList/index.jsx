import React, { Component, PropTypes } from 'react';
import Scroller from '../../../../components/common/Scroller';
import { findDOMNode } from 'react-dom';
import Empty from './Empty';
import UnreadDivider from './UnreadDivider';
import UnreadButton from './UnreadButton';
import ItemManager from './ItemManager';
import { Map } from 'immutable';

const BOTTOM_OFFSET_THRESHOLD = 20;
const MARK_ALL_TIMEOUT = 2000;
let savedScrollHeight = null;

class MessageList extends Component {
  componentDidMount() {
    const {
      conversation,
      loadMessages,
      markAllMessagesRead,
    } = this.props;
    const conversationId = conversation.get('id');
    const hasUnread = !!conversation.get('unreadMessagesCount', 0);

    loadMessages(conversationId)
      .then(this.scrollToUnread.bind(this))
      .then(() => hasUnread && markAllMessagesRead(conversationId));
  }
  shouldComponentUpdate(nextProps) {
    const {
      conversation,
      isAtBottom,
      isSelectState,
      isUnreadButtonVisible,
      isUnreadDividerVisible,
      messages,
      selectedUuids,
    } = this.props;
    const {
      conversation: nextConversation,
      isAtBottom: nextIsAtBottom,
      isSelectState: nextIsSelectState,
      isUnreadButtonVisible: nextIsUnreadButtonVisible,
      isUnreadDividerVisible: nextIsUnreadDividerVisible,
      messages: nextMessages,
      selectedUuids: nextSelectedUuids,
    } = nextProps;

    return (
      conversation !== nextConversation ||
      isAtBottom !== nextIsAtBottom ||
      isSelectState !== nextIsSelectState ||
      isUnreadButtonVisible !== nextIsUnreadButtonVisible ||
      isUnreadDividerVisible !== nextIsUnreadDividerVisible ||
      selectedUuids !== nextSelectedUuids ||
      !(messages.isSubset(nextMessages) && messages.isSuperset(nextMessages))
    );
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
      conversation,
      isAtBottom,
      messages,
      markAllMessagesRead,
      setIsDividerVisible,
    } = this.props;
    const lastMessage = messages.last();

    if (prevProps.messages.first() && messages.first()) {
      if (prevProps.messages.first() !== messages.first()) {
        this.holdScroll(); // Подгрузились сообщения из истории
      } else if (prevProps.messages.count() !== messages.count()) { // добавлено сообщение
        const isMyMessage = lastMessage.get('userId') === conversation.get('userId');

        if (isAtBottom || isMyMessage) {
          this.scrollToBottom();
          setIsDividerVisible(false);
          if (this.hasUnread(this.props)) {
            markAllMessagesRead(conversation.get('id'));
          }
        } else {
          setIsDividerVisible(true);
        }

      }
    } else {
      this.scrollToBottom();
    }

    this.checkScrollPositions();
  }
  hasUnread(props) {
    const {
      conversation,
      messages,
    } = props;

    return messages
      .filter((msg) => msg.get('userId') !== conversation.get('userId'))
      .some((msg) => msg.has('readAt') && !msg.get('readAt'));
  }
  checkScrollPositions() {
    const {
      conversation,
      markAllMessagesRead,
      setAtBottom,
      setIsUnreadButtonVisible,
    } = this.props;
    const scrollerPaneNode = this.refs.scroller.refs.scrollerPane;
    const divider = findDOMNode(this.refs['unread-divider']);
    const scrollerPaneBottom = scrollerPaneNode.scrollTop +
      scrollerPaneNode.offsetHeight;

    setAtBottom(scrollerPaneBottom >
        scrollerPaneNode.scrollHeight - BOTTOM_OFFSET_THRESHOLD);

    if (divider) {
      const isDividerAboveBottom = scrollerPaneBottom > divider.offsetTop;
      setIsUnreadButtonVisible(!isDividerAboveBottom);
      if (isDividerAboveBottom &&
          !this.markTimeout &&
          typeof setTimeout === 'function') {
        this.markTimeout = setTimeout(() => {
          this.markTimeout = null;
          markAllMessagesRead(conversation.get('id'));
        }, MARK_ALL_TIMEOUT);
      }
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

    this.checkScrollPositions();
  }
  scrollToBottom() {
    this.scrollList(this.refs.scroller.refs.scrollerPane.scrollHeight);
  }
  scrollList(offset) {
    this.refs.scroller.refs.scrollerPane.scrollTop = offset;

    this.checkScrollPositions();
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
  scrollToUnreadDivider() {
    const divider = findDOMNode(this.refs['unread-divider']);
    const scrollerPaneNode = this.refs.scroller.refs.scrollerPane;

    if (!divider) {
      return;
    }

    this.scrollList(divider.offsetTop - scrollerPaneNode.offsetHeight / 2);
  }
  holdScroll() {
    this.scrollList(this.refs.scroller.refs.scrollerPane.scrollHeight - savedScrollHeight);
    savedScrollHeight = null;
  }
  messageKey(msg) {
    return `${msg.get('id')}-${msg.get('uuid')}`;
  }
  unreadDividerPosition() {
    const {
      conversation,
      isUnreadDividerVisible,
      messages,
    } = this.props;

    return isUnreadDividerVisible && messages
      .map((msg, idx) => msg.set('idx', idx))
      .filter((msg) => msg.get('userId') !== conversation.get('userId'))
      .find((msg, idx, arr) => {
        const prevMsg = arr.get(idx - 1, Map());

        return (
          !msg.get('readAt') &&
          !!prevMsg.get('readAt')
        );
      }, null, Map())
      .get('idx');
  }
  renderUnreadButton() {
    const {
      isUnreadButtonVisible,
    } = this.props;

    if (isUnreadButtonVisible && this.hasUnread(this.props)) {
      return <UnreadButton onClick={this.scrollToUnreadDivider.bind(this)} />;
    }
  }
  renderMessages() {
    const {
      conversation,
      isSelectState,
      messages,
      startSelect,
      selectedUuids,
    } = this.props;

    if (messages.count() === 0) {
      return <Empty />;
    } else {
      const unreadDividerPosition = this.unreadDividerPosition();

      return messages.map((message, idx) => {
        const item = (
          <ItemManager
            conversation={conversation}
            isSelectState={isSelectState}
            isSelected={selectedUuids.includes(message.get('uuid', false))}
            key={this.messageKey(message)}
            message={message}
            messagesCount={messages.count()}
            ref={this.messageKey(message)}
            startSelect={startSelect}
          />
        );

        return idx === unreadDividerPosition ?
          [
            <UnreadDivider
              key={`unread-divider-${idx}`}
              ref="unread-divider"
            />,
            item,
          ] :
          item;
      }).valueSeq();
    }
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
        {this.renderUnreadButton()}
      </Scroller>
    );
  }
}

MessageList.propTypes = {
  conversation: PropTypes.object.isRequired,
  isAtBottom: PropTypes.bool.isRequired,
  isSelectState: PropTypes.bool.isRequired,
  isUnreadButtonVisible: PropTypes.bool.isRequired,
  isUnreadDividerVisible: PropTypes.bool.isRequired,
  loadArchivedMessages: PropTypes.func.isRequired,
  loadMessages: PropTypes.func.isRequired,
  markAllMessagesRead: PropTypes.func.isRequired,
  messages: PropTypes.object.isRequired,
  selectedUuids: PropTypes.object.isRequired,
  setAtBottom: PropTypes.func.isRequired,
  setIsDividerVisible: PropTypes.func.isRequired,
  setIsUnreadButtonVisible: PropTypes.func.isRequired,
  startSelect: PropTypes.func.isRequired,
};

export default MessageList;
