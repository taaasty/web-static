/*global i18n */
import React, { PropTypes } from 'react';
import {
  MSG_POPUP_STATE_THREAD,
  MSG_POPUP_STATE_GROUP_CHOOSER,
  MSG_POPUP_STATE_GROUP_SETTINGS,
} from '../../actions/MessagesPopupActions';
import {
  PUBLIC_CONVERSATION,
  GROUP_CONVERSATION,
} from '../../constants';
import TitlePublicConversation from './TitlePublicConversation';
import TitleGroupConversation from './TitleGroupConversation';
import TitlePrivateConversation from './TitlePrivateConversation';

function PopupTitle({ conversation, state }) {
  if (!conversation.isEmpty() && state === MSG_POPUP_STATE_THREAD) {
    if (conversation.get('type') === PUBLIC_CONVERSATION) {
      return <TitlePublicConversation conversation={conversation} />;
     } else if (conversation.get('type') === GROUP_CONVERSATION) {
       return <TitleGroupConversation conversation={conversation} />;
     } else {
       return <TitlePrivateConversation conversation={conversation} />;
     }
  } else {
    return (
      <div className="messages__popup-title">
        <div className="messages__popup-title-text">
          {i18n.t(state === MSG_POPUP_STATE_GROUP_CHOOSER || state === MSG_POPUP_STATE_GROUP_SETTINGS
             ? 'messages_group_title'
             : 'messages_popup_title'
           )}
        </div>
      </div>
    );
  }
}

PopupTitle.propTypes = {
  conversation: PropTypes.object.isRequired,
  state: PropTypes.string.isRequired,
};

export default PopupTitle;
