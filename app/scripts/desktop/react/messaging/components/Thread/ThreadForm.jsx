/*global i18n */
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
} from '../../actions/ThreadActions';
import {
  postNewMessage,
} from '../../actions/MessageActions';
import { connect } from 'react-redux';

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
    const files = [].slice.call(ev.target.files);
    this.setState({ files: this.state.files.concat(files.map(this.getFileData)) });
  }
  onFileRemove(idx) {
    this.setState({
      files: this.state.files.filter((el, i) => i !== idx),
    });
  }
  getFileData(file) {
    return file;
  }
  updateFormState() {
    this.setState({ hasText: this.form && this.form.value !== '' });
    this.typing();
  }
  clearForm() {
    this.form.value = '';
    this.setState({ hasText: false, files: [] });
  }
  msgReadyToSend() {
    const { files, hasText } = this.state;

    return (hasText || files.length) && !this.shouldDisableForm();
  }
  sendMessage() {
    if (this.msgReadyToSend()) {
      postNewMessage({
        content: this.form.value,
        files: this.state.files,
        conversationId: this.props.conversation.id,
        replyMessage: this.state.replyMessage,
      });

      this.clearForm();
    }
  }
  render() {
    const {
      cancelReplyTo,
      conversation,
      currentUserId,
      messageFiles,
      messageText,
      replyMessage,
      replyMessageAuthor,
    } = this.state;
    const disabledInputs = conversation.get('type') === GROUP_CONVERSATION &&
      (conversation.get('usersLeft').includes(currentUserId) ||
       conversation.get('usersKicked').includes(currentUserId));

    return (
      <div className="message-form">
        <div className="message-form__controls">
          {replyMessage &&
           <ThreadFormReplyTo
             cancel={cancelReplyTo}
             conversation={conversation}
             message={replyMessage}
             messageAuthor={replyMessageAuthor}
           />
          }
          <ThreadFormMediaPreview
            files={messageFiles}
            onFileRemove={this.onFileRemove.bind(this)}
          />
          <div className="message-form__textarea-container">
            <div className="message-form__button-container">
              <ThreadFormUploadButton
                disabled={disabledInputs}
                onChange={this.onFileInputChange.bind(this)}
              />
            </div>
            <Textarea
              className="message-form__textarea"
              disabled={disabledInputs}
              maxRows={3}
              minRows={1}
              onChange={this.updateFormState.bind(this)}
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
  cancelReplyTo: PropTypes.func.isRequired,
  conversation: PropTypes.object.isRequired,
  postNewMessage: PropTypes.func.isRequired,
  replyMessage: PropTypes.object,
  replyMessageAuthor: PropTypes.object,
  sendTyping: PropTypes.func.isRequired,
};

export default connect(
  (state, { conversation }) => {

  },
  {
    cancelReplyTo,
  }
)(ThreadForm);
