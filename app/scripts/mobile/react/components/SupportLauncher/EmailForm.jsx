/*global i18n */
import React, { Component, PropTypes } from 'react';
import ConversationMessageFormField from '../messenger/conversation/messageForm/field';
import MessengerHeader from '../messenger/MessengerHeader';
import NotifyController from '../../controllers/notify';

class EmailForm extends Component {
  handleSubmit(ev) {
    const email = this.refs.email.value;
    const text = this.refs.msg.value;

    (ev && ev.preventDefault());

    Api.messenger.sendSupportMessage(email, text)
      .then((data) => {
        NotifyController.notifySuccess(i18n.t('messages.messenger_send_support_message_success'), 3000);
        this.props.onClose();
      })
      .fail((err) =>  {
        NotifyController.notifyError(i18n.t('messages.messenger_send_support_message_error'));
      });
  }
  render() {
    const handleSubmit = this.handleSubmit.bind(this);

    return (
      <div className="messages messages--fixed messages--email-form">
        <div className="messages__section messages__section--thread">
          <MessengerHeader
            onClose={this.props.onClose}
            title={i18n.t('messenger.support_header')}
          />
          <div className="messages__body">
            <div className="messages__scroll">
              <p className="messages__text messages__text--center">
                {i18n.t('messenger.support_message')}
              </p>
            </div>
          </div>
          <div className="messages__footer">
            <form className="message-form" onSubmit={handleSubmit}>
              <input
                className="message-form__email"
                placeholder={i18n.t('placeholders.messenger_email')}
                ref="email"
                required
                type="email"
              />
              <button className="message-form__submit">
                {i18n.t('buttons.messenger_create_message')}
              </button>
              <ConversationMessageFormField
                onSubmit={handleSubmit}
                ref="msg"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

EmailForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default EmailForm;
