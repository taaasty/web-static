/*global messagingService, TastyEvents */
import React, { createClass, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import MessageActions from '../../../../actions/MessageActions';
import MessagesStore from '../../../../stores/MessagesStore';
import Item from './Item';
import SystemMessage from './SystemMessage';

const ERROR_STATE = 'error';
const SENT_STATE = 'sent';
const READ_STATE = 'read';
const SENDING_STATE = 'sending';

const SYSTEM_MSG = 'SystemMessage';

function isElementInViewport(el, parent) {
  const position = getElementPosition(el, parent);

  return ((position.viewportHeight > position.elemBottomBorder ||
           position.viewportHeight > position.elemTopBorder) &&
          (position.elemTopBorder > 0 || position.elemBottomBorder > 0));
}
  
function getElementPosition(el, parent) {
  const _topBorder = el.offsetTop - parent.scrollTop;

  return {
    elemTopBorder: _topBorder,
    elemBottomBorder: _topBorder + el.offsetHeight,
    viewport: parent,
    viewportHeight: parent.offsetHeight,
  };
}

const ItemManager = createClass({
  propTypes: {
    conversationType: PropTypes.string.isRequired,
    currentUserId: PropTypes.number.isRequired,
    message: PropTypes.object.isRequired,
    messagesCount: PropTypes.number,
    selectState: PropTypes.bool.isRequired,
    startSelect: PropTypes.func.isRequired,
  },

  getInitialState() {
    return this.stateFromProps(this.props);
  },

  componentDidMount() {
    if (this.isUnread() && this.state.messageInfo.type === 'incoming') {
      if (this.props.messagesCount > 10) {
        TastyEvents.on(TastyEvents.keys.message_list_scrolled(), this.handleMessageListScroll);
      } else {
        setTimeout(() => this.readMessage(), 0); //fixes Flux issue with nested dispatches
      }
    }

    if (this.isErrorState()) {
      messagingService.addReconnectListener(this.resendMessage);
    }
  },

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps));
  },

  componentDidUpdate() {
    if (this.isErrorState()) {
      messagingService.addReconnectListener(this.resendMessage);
    }
  },

  componentWillUnmount() {
    TastyEvents.off(TastyEvents.keys.message_list_scrolled(), this.handleMessageListScroll);
    messagingService.removeReconnectListener(this.resendMessage);
  },

  activateSendingState() {
    this.setState({ currentState: SENDING_STATE });
  },

  activateErrorState() {
    this.setState({ currentState: ERROR_STATE });
  },

  isErrorState() {
    return this.state.currentState === ERROR_STATE;
  },

  isUnread() {
    return this.props.message.read_at === null;
  },

  resendMessage() {
    const { content, conversation_id: conversationId, files, uuid, reply_message: replyMessage } = this.props.message;
    this.activateSendingState();

    return MessageActions.resendMessage({ content, conversationId, files, uuid, replyMessage });
  },
    
  readMessage() {
    return MessageActions.readMessage(this.props.message.conversation_id, this.props.message.id);
  },

  stateFromProps(props) {
    const { conversation_id: conversationId, reply_message: replyMessage } = props.message;
    let currentState;

    if (props.message.sendingState) {
      currentState = ERROR_STATE;
    } else if (props.message.id) {
      currentState = this.isUnread() ? SENT_STATE : READ_STATE;
    } else {
      currentState = SENDING_STATE;
    }

    return {
      currentState,
      replyMessage,
      messageInfo: MessagesStore.getMessageInfo(props.message, conversationId),
      replyMessageInfo: replyMessage && MessagesStore.getMessageInfo(replyMessage, conversationId),
      selected: MessagesStore.isSelected(props.message.id),
    };
  },

  toggleSelection() {
    MessageActions.toggleSelection(this.props.message.id);
  },

  handleMessageListScroll(scrollerNode) {
    const messageNode = findDOMNode(this);

    if (isElementInViewport(messageNode, scrollerNode)) {
      this.readMessage();
      TastyEvents.off(TastyEvents.keys.message_list_scrolled(), this.handleMessageListScroll);
    }
  },
  
  render() {
    const { conversationType, currentUserId, message, selectState, startSelect } = this.props;
    const { currentState, messageInfo, replyMessage, replyMessageInfo, selected } = this.state;
    const { type } = message;

    if (!messageInfo) {
      return <noscript />;
    } else if (type !== SYSTEM_MSG) {
      return (
        <Item
          conversationType={conversationType}
          currentUserId={currentUserId}
          deliveryStatus={currentState}
          message={message}
          messageInfo={messageInfo}
          onResendMessage={this.resendMessage}
          replyMessage={replyMessage}
          replyMessageInfo={replyMessageInfo}
          selectState={selectState}
          selected={selected}
          startSelect={startSelect}
          toggleSelection={this.toggleSelection}
        />
      );
    } else {
      return <SystemMessage message={message} />;
    }
  },
});

export default ItemManager;
