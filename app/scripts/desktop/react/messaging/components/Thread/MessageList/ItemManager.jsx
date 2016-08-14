import React, { PropTypes } from 'react';
import Item from './Item';
import SystemMessage from './SystemMessage';
import {
  resendMessage,
} from '../../../actions/MessageActions';
import {
  toggleSelection,
} from '../../../actions/ThreadActions';
import {
  defaultUser,
} from '../index';
import { connect } from 'react-redux';
import { Map } from 'immutable';

const SYSTEM_MSG = 'SystemMessage';
const emptyMsgState = Map();
const emptyMsg = Map();

function ItemManager(props) {
  const {
    conversation,
    isSelectState,
    isSelected,
    message,
    messageAuthor,
    messageState,
    replyMessage,
    replyMessageAuthor,
    resendMessage,
    startSelect,
    toggleSelection,
  } = props;
  const conversationType = conversation.get('type');
  const conversationUserId = conversation.get('userId');

  function onResendMessage() {
    return resendMessage(message.get('uuid'), {
      conversation,
      replyMessage,
      content: message.get('content'),
      files: message.get('files'),
    });
  }

  function onToggleSelection() {
    if(isSelectState) {
      toggleSelection(message.get('uuid'));
    }
  }

  return message.get('type') === SYSTEM_MSG
    ? (
      <SystemMessage message={message} />
    )
    : (
      <Item
        conversationType={conversationType}
        conversationUserId={conversationUserId}
        isSelected={isSelected}
        message={message}
        messageAuthor={messageAuthor}
        messageState={messageState}
        onResendMessage={onResendMessage}
        replyMessage={replyMessage}
        replyMessageAuthor={replyMessageAuthor}
        startSelect={startSelect}
        toggleSelection={onToggleSelection}
      />
    );
}

ItemManager.propTypes = {
  conversation: PropTypes.object.isRequired,
  isSelectState: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  message: PropTypes.object.isRequired,
  messageAuthor: PropTypes.object.isRequired,
  messageState: PropTypes.object.isRequired,
  messagesCount: PropTypes.number,
  replyMessage: PropTypes.object.isRequired,
  replyMessageAuthor: PropTypes.object.isRequired,
  resendMessage: PropTypes.func.isRequired,
  startSelect: PropTypes.func.isRequired,
  toggleSelection: PropTypes.func.isRequired,
};

export default connect(
  (state, { message }) => {
    const messageAuthor = state
      .entities
      .getIn(['tlog', String(message.get('userId'))], defaultUser);
    const messageState = state
      .msg
      .message
      .get(message.get('uuid'), emptyMsgState);
    const replyMessage = state
      .entities
      .getIn(['message', String(message.get('replyMessage'))], emptyMsg);
    const replyMessageAuthor = state
      .entities
      .getIn(['tlog', String(replyMessage.get('userId'))], defaultUser);

    return {
      messageAuthor,
      messageState,
      replyMessage,
      replyMessageAuthor,
    };
  },
  {
    resendMessage,
    toggleSelection,
  }
)(ItemManager);
