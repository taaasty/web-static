/*global i18n */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import ThreadFormUploadButton from './ThreadFormUploadButton';
import ThreadFormMediaPreview from './ThreadFormMediaPreview';
import MessageActions from '../../../actions/MessageActions';
import ConversationActions from '../../../actions/ConversationActions';
import CurrentUserStore from '../../../../stores/current_user';
import { GROUP_CONVERSATION, TYPING_THROTTLE_INTERVAL } from '../../../constants/ConversationConstants';
import Textarea from 'react-textarea-autosize';

class ThreadForm extends Component {
  state = {
    user: CurrentUserStore.getUser(),
    hasText: false,
    files: [],
    isLoading: false,
  };
  componentWillMount() {
    this.typing = _.throttle(
      ConversationActions.sendTyping.bind(null, this.props.conversation.id),
      TYPING_THROTTLE_INTERVAL,
      { leading: true, trailing: false }
    );
  }
  componentDidMount() {
    this.form = this.refs.messageForm;
    if (this.form instanceof HTMLElement) {
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
  shouldDisableForm() {
    const { type, users_left=[], users_kicked=[] } = this.props.conversation;
    const { user: { id } } = this.state;

    return type === GROUP_CONVERSATION &&
      (users_left.indexOf(id) > -1 || users_kicked.indexOf(id) > -1);
  }
  sendMessage() {
    if (this.msgReadyToSend()) {
      MessageActions.newMessage({
        content: this.form.value,
        files: this.state.files,
        conversationId: this.props.conversation.id,
      });

      this.clearForm();
    }
  }
  render() {
    const disabledInputs = this.shouldDisableForm();

    return (
      <div className="message-form">
        <div className="message-form__controls">
          <ThreadFormMediaPreview
            files={this.state.files}
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
            />
          </div>
        </div>
      </div>
    );
  }
}

ThreadForm.propTypes = {
  conversation: PropTypes.object.isRequired,
};

export default ThreadForm;
