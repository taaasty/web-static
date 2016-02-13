import React, { PropTypes } from 'react';
import ConversationsStore from '../../stores/ConversationsStore';
import { THREAD_STATE, GROUP_CHOOSER_STATE, GROUP_SETTINGS_STATE } from '../../stores/MessagesPopupStore';
import { PUBLIC_CONVERSATION, GROUP_CONVERSATION } from '../../constants/ConversationConstants';
import TitlePublicConversationActions from './TitlePublicConversationActions';
import TitleGroupConversationActions from './TitleGroupConversationActions';
import TitlePrivateConversationActions from './TitlePrivateConversationActions';

function PopupTitle({ id, state }) {
  const conversation = ConversationsStore.getConversation(id);

  if (state === THREAD_STATE) {
    if (conversation.type === PUBLIC_CONVERSATION) {
      return (
        <div className="messages__popup-title">
          <div className="messages__popup-title-text --with-actions">
            {i18n.t('messages_entry_title')}
          </div>
          <TitlePublicConversationActions conversation={conversation} />
        </div>
      );
     } else if (conversation.type === GROUP_CONVERSATION) {
        return (
          <div className="messages__popup-title">
            <div className="messages__popup-title-text --with-actions">
              {i18n.t('messages_group_title')}
            </div>
            <TitleGroupConversationActions conversation={conversation} />
          </div>
        );
     } else {
       return (
          <div className="messages__popup-title">
            <div className="messages__popup-title-text --with-actions">
              {i18n.t('messages_thread_title', { slug: conversation.recipient.slug })}
            </div>
            <TitlePrivateConversationActions conversation={conversation} />
          </div>
       );
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
  id: PropTypes.number,
  state: PropTypes.string.isRequired,
};

export default PopupTitle;
