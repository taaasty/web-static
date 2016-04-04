/*global i18n */
import React, { Component } from 'react';
import ConversationMessageFormField from '../messenger/conversation/messageForm/field';
import MessengerHeader from '../messenger/common/header';

class EmailForm extends Component {
  render() {
    return (
      <div className="messages messages--fixed">
        <div className="messages__section messages__section--thread">
          <MessengerHeader title={i18n.t('messenger.support_header')} />
          <div className="messages__body">
          </div>
          <div className="messages__footer">
            <form className="message-form">
              <button className="message-form__submit">
                {i18n.t('buttons.messenger_create_message')}
              </button>
              <ConversationMessageFormField
                onSubmit={() => {}}
                ref="msg"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EmailForm;
