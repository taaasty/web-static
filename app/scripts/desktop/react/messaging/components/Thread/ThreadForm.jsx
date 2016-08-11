/*global i18n, ga */
import { throttle } from 'lodash';
import React, { Component, PropTypes } from 'react';
import ThreadFormUploadButton from './ThreadFormUploadButton';
import ThreadFormMediaPreview from './ThreadFormMediaPreview';
import ThreadFormReplyTo from './ThreadFormReplyTo';
import {
  GROUP_CONVERSATION,
  TYPING_THROTTLE_INTERVAL,
} from '../../constants';
import Textarea from 'react-textarea-autosize';
import {
  sendTyping,
} from '../../actions/TypingActions';
import {
  cancelReplyTo,
  setMessageText,
  addMessageFiles,
  removeMessageFile,
  resetThreadForm,
} from '../../actions/ThreadActions';
import {
  postNewMessage,
} from '../../actions/MessageActions';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';

const emptyUser = Map();
const emptyMessage = Map();
const emptyList = List();

class ThreadForm extends Component {
  componentWillMount() {
    const {
      conversation,
      sendTyping,
    } = this.props;

    this.typing = throttle(
      sendTyping.bind(null, conversation.get('id')),
      TYPING_THROTTLE_INTERVAL,
      { leading: true, trailing: false }
    );
  }
  componentDidMount() {
    this.form = this.refs.messageForm;
    if (typeof this.form.focus === 'function') {
      this.form.focus();
    }
  }
  onKeyDown(ev) {
    if (ev.key === 'Enter' && !ev.shiftKey && !ev.ctrlKey && !ev.altKey && !ev.metaKey) {
      ev.preventDefault();
      this.typing.cancel();
      this.sendMessage();
    }
  }
  onFileInputChange(ev) {
    if (!window.File || !window.FileList) {
      return;
    }

    this.props.addMessageFiles(ev.target.files);
  }
  updateMessageText(ev) {
    this.props.setMessageText(ev.target.value);
    this.typing();
  }
  msgReadyToSend() {
    const {
      messageFiles,
      messageText,
    } = this.props;

    return (messageText.length > 0 || messageFiles.count() > 0)
      && !this.isFormDisabled();
  }
  isFormDisabled() {
    const {
      currentUserId,
      conversation,
    } = this.props;

    return conversation.get('type') === GROUP_CONVERSATION &&
      (conversation.get('usersLeft', emptyList).includes(currentUserId) ||
       conversation.get('usersDeleted', emptyList).includes(currentUserId));
  }
  sendMessage() {
    const {
      conversation,
      messageFiles,
      messageText,
      postNewMessage,
      replyMessage,
      resetThreadForm,
    } = this.props;

    if (this.msgReadyToSend()) {
      postNewMessage({
        conversation,
        replyMessage,
        content: messageText,
        files: messageFiles,
      })
      .then(() => {
        if (typeof ga === 'function') {
          ga('send', 'event', 'UX', 'SendMessage');
        }
      });

      resetThreadForm();
    }
  }
  render() {
    const {
      cancelReplyTo,
      conversation,
      messageFiles,
      messageText,
      removeMessageFile,
      replyMessage,
      replyMessageAuthor,
    } = this.props;
    const isFormDisabled = this.isFormDisabled();

    return (
      <div className="message-form">
        <div className="message-form__controls">
          {!replyMessage.isEmpty() &&
            <ThreadFormReplyTo
              cancel={cancelReplyTo}
              conversation={conversation}
              message={replyMessage}
              messageAuthor={replyMessageAuthor}
            />
          }
          <ThreadFormMediaPreview
            files={messageFiles}
            onFileRemove={removeMessageFile}
          />
          <div className="message-form__textarea-container">
            <div className="message-form__button-container">
              <ThreadFormUploadButton
                disabled={isFormDisabled}
                onChange={this.onFileInputChange.bind(this)}
              />
            </div>
            <Textarea
              className="message-form__textarea"
              disabled={isFormDisabled}
              maxRows={3}
              minRows={1}
              onChange={this.updateMessageText.bind(this)}
              onKeyDown={this.onKeyDown.bind(this)}
              placeholder={i18n.t('new_message_placeholder')}
              ref="messageForm"
              value={messageText}
            />
          </div>
        </div>
      </div>
    );
  }
}

ThreadForm.propTypes = {
  addMessageFiles: PropTypes.func.isRequired,
  cancelReplyTo: PropTypes.func.isRequired,
  conversation: PropTypes.object.isRequired,
  currentUserId: PropTypes.number.isRequired,
  messageFiles: PropTypes.object.isRequired,
  messageText: PropTypes.string.isRequired,
  postNewMessage: PropTypes.func.isRequired,
  removeMessageFile: PropTypes.func.isRequired,
  replyMessage: PropTypes.object,
  replyMessageAuthor: PropTypes.object,
  resetThreadForm: PropTypes.func.isRequired,
  sendTyping: PropTypes.func.isRequired,
  setMessageText: PropTypes.func.isRequired,
};

export default connect(
  (state, { conversation }) => {
    const currentUserId = state.currentUser.data.id;
    const messageFiles = state.msg.thread.get('messageFiles', List());
    const messageText = state.msg.thread.get('messageText', '');
    const replyId = state.msg.thread.get('replyToId');
    const replyMessage = state
      .entities
      .getIn(['message', String(replyId)], emptyMessage);
    const replyMessageAuthor = state
      .entities
      .getIn(['tlog', String(replyMessage.get('userId'))], emptyUser);

    return {
      conversation,
      currentUserId,
      messageFiles,
      messageText,
      replyMessage,
      replyMessageAuthor,
    };
  },
  {
    cancelReplyTo,
    postNewMessage,
    setMessageText,
    addMessageFiles,
    removeMessageFile,
    sendTyping,
    resetThreadForm,
  }
)(ThreadForm);
