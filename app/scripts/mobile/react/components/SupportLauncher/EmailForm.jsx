/*global i18n */
import React, { Component, PropTypes } from 'react';
import ConversationMessageFormField from '../messenger/conversation/messageForm/field';
import MessengerHeader from '../messenger/MessengerHeader';

class EmailForm extends Component {
  handleSubmit(ev) {
    ev.preventDefault();
  }
  render() {
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
            <form className="message-form">
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
                onSubmit={this.handleSubmit.bind(this)}
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
