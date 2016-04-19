/*global i18n */
import React, { PropTypes } from 'react';
import { THREAD_STATE, GROUP_CHOOSER_STATE, GROUP_SETTINGS_STATE } from '../../stores/MessagesPopupStore';
import { PUBLIC_CONVERSATION, GROUP_CONVERSATION } from '../../constants/ConversationConstants';
import TitlePublicConversation from './TitlePublicConversation';
import TitleGroupConversation from './TitleGroupConversation';
import TitlePrivateConversation from './TitlePrivateConversation';

function PopupTitle({ conversation, state }) {
  if (state === THREAD_STATE) {
    if (conversation.type === PUBLIC_CONVERSATION) {
      return <TitlePublicConversation conversation={conversation} />;
     } else if (conversation.type === GROUP_CONVERSATION) {
       return <TitleGroupConversation conversation={conversation} />;
     } else {
       return <TitlePrivateConversation conversation={conversation} />;
     }
  } else {
    return (
      <div className="messages__popup-title">
        <div className="messages__popup-title-text">
          {i18n.t(state === GROUP_CHOOSER_STATE || state === GROUP_SETTINGS_STATE
             ? 'messages_group_title'
             : 'messages_popup_title'
           )}
        </div>
      </div>
    );
  }
}

PopupTitle.propTypes = {
  conversation: PropTypes.object,
  state: PropTypes.string.isRequired,
};

export default PopupTitle;
