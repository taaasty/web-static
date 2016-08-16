/*global i18n */
import React, { Component, PropTypes } from 'react';
import Popup from '../Popup';
import classNames from 'classnames';
import NoticeService from '../../services/Notice';

class EmailForm extends Component {
  handleSubmit(ev) {
    const email = this.refs.email.value;
    const text = this.refs.msg.value;

    (ev && ev.preventDefault());

    this.props.sendSupportRequest(email, text)
      .then(() => {
        NoticeService.notifySuccess(i18n.t('messages.messenger_send_support_message_success'), 3000);
        this.props.onClose();
      })
      .catch(({ error }) => {
        const errMsg = error && error.error_code && error.error || '';
        NoticeService.notifyError(`${i18n.t('messages.messenger_send_support_message_error')}. ${errMsg}`);
      });
  }
  handleKeyDown(ev) {
    if (ev.key === 'Enter' && !ev.shiftKey && !ev.ctrlKey && !ev.altKey && !ev.metaKey) {
      this.handleSubmit(ev);
    }
  }
  render() {
    const buttonClasses = classNames({
      'message-form__button-send': true,
      '--disabled': false,
    });


    return (
      <Popup
        className="popup--messages popup-light"
        clue="email-support"
        draggable
        onClose={this.props.onClose}
        title={i18n.t('messenger.support_header')}
      >
        <div className="messages messages--email-form">
          <div className="messages__section messages__section--thread">
            <div className="messages__body">
              <div className="messages__thread-overlay" />
              <div className="messages__list">
                <div className="messages__list-cell">
                  <div className="messages__empty">
                    <div className="messages__empty-text">
                      {i18n.t('messenger.support_message')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="messages__footer">
              <form className="message-form" onSubmit={this.handleSubmit.bind(this)}>
                <div className="message-form__email-container">
                  <input
                    className="message-form__email"
                    placeholder={i18n.t('messenger.support_email_placeholder')}
                    ref="email"
                    required
                    type="email"
                  />
                </div>
                <div className="message-form__textarea-container">
                  <textarea
                    className="message-form__textarea"
                    onKeyDown={this.handleKeyDown.bind(this)}
                    placeholder={i18n.t('new_message_placeholder')}
                    ref="msg"
                    required
                  />
                </div>
                <div className="message-form__button-container">
                  <button className={buttonClasses}>
                    {i18n.t('buttons.messenger.send')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Popup>
    );
  }
}

EmailForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  sendSupportRequest: PropTypes.func.isRequired,
};

export default EmailForm;
