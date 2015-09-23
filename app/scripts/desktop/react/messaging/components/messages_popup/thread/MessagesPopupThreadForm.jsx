/*global i18n */
import React, { findDOMNode, Component, PropTypes } from 'react';
import UserAvatar from '../../../../components/avatars/user_avatar';
import ThreadFormUploadButton from './ThreadFormUploadButton';
import ThreadFormMediaPreview from './ThreadFormMediaPreview';

class MessagesPopupThreadForm extends Component {
  componentDidMount() {
    this.form = findDOMNode(this.refs.messageForm);
    if (this.form instanceof HTMLElement) {
      this.form.focus();
    }
  }
  state = {
    user: window.CurrentUserStore.getUser(),
    files: [],
    isLoading: false,
  }
  onKeyDown(ev) {
    if (ev.key === 'Enter' && (!this.isFormEmpty() || this.state.files.length) &&
        !ev.shiftKey && !ev.ctrlKey && !ev.altKey && !ev.metaKey) {
      ev.preventDefault();

      MessageActions.newMessage({
        content: ev.target.value,
        files: this.state.files,
        conversationId: this.props.conversationId,
      });

      this.clearForm();
    }
  }
  onFileInputChange(ev) {
    if (!window.File || !window.FileList) {
      return;
    }
    const files = [].slice.call(ev.target.files);
    this.setState({ files: files.map(this.getFileData) });
  }
  getFileData(file) {
    return file;
  }
  isFormEmpty() {
    return (this.form.value === '');
  }
  clearForm() {
    this.form.value = '';
    this.setState({ files: [] });
  }
  render() {
    return (
      <div className="message-form">
        <span className="messages__user-avatar">
          {
            this.state.isLoading
              ? <span className="spinner spinner--31x31">
                  <span className="spinner__icon"></span>
                </span>
              : <UserAvatar
                  size={35}
                  user={this.state.user}
                />
          }
        </span>
        <div className="message-form__textarea-container">
          <textarea
            className="message-form__textarea"
            onKeyDown={this.onKeyDown.bind(this)}
            placeholder={i18n.t('new_message_placeholder')}
            ref="messageForm"
          />
          <ThreadFormUploadButton onChange={this.onFileInputChange.bind(this)}/>
        </div>
        <ThreadFormMediaPreview files={this.state.files} />
      </div>
    );
  }
}

MessagesPopupThreadForm.propTypes = {
  conversationId: PropTypes.number.isRequired,
};

export default MessagesPopupThreadForm;
