/*global ReactGrammarMixin, messagingService, TastyEvents */
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
    currentUserId: PropTypes.number.isRequired,
    message: PropTypes.object.isRequired,
    messagesCount: PropTypes.number,
    selectState: PropTypes.bool.isRequired,
  },
  mixins: [ ReactGrammarMixin ],

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
    const { content, conversation_id: conversationId, files, uuid } = this.props.message;
    this.activateSendingState();

    return MessageActions.resendMessage({ content, conversationId, files, uuid });
  },
    
  readMessage() {
    return MessageActions.readMessage(this.props.message.conversation_id, this.props.message.id);
  },

  stateFromProps(props) {
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
      messageInfo: MessagesStore.getMessageInfo(props.message, props.message.conversation_id),
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
    const { currentUserId, message, selectState } = this.props;
    const { currentState, messageInfo, selected } = this.state;
    const { type } = message;

    return type !== SYSTEM_MSG
      ? <Item
          currentUserId={currentUserId}
          deliveryStatus={currentState}
          message={message}
          messageInfo={messageInfo}
          onResendMessage={this.resendMessage}
          selectState={selectState}
          selected={selected}
          toggleSelection={this.toggleSelection}
        />
      : <SystemMessage message={message} />;
  },
});

export default ItemManager;
