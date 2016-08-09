/*global i18n */
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import {
  stopSelect,
  setReplyToId,
} from '../../actions/ThreadActions';
import {
  deleteMessages,
} from '../../actions/ConversationActions';
import {
  showGetPremiumPopup,
} from '../../../actions/PopupActions';

import { connect } from 'react-redux';

function SelectForm(props) {
  const {
    canDelete,
    canDeleteEverywhere,
    canReply,
    deleteEverywhereFn,
    deleteFn,
    isPremium,
    setReplyToId,
    showGetPremiumPopup,
    stopSelect,
  } = props;
  const deleteClasses = classNames({
    'message-form__button': true,
    'button--red': true,
    '--disabled': !canDelete,
  });
  const deleteEverywhereClasses = classNames({
    'message-form__button': true,
    'button--red': true,
    '--disabled': !canDeleteEverywhere,
  });
  const replyClasses = classNames({
    'message-form__button': true,
    'button--green': true,
    '--disabled': !canReply,
  });

  function deleteMessages() {
    if (canDelete && typeof deleteFn === 'function')
      deleteFn();
  }

  function deleteMessagesEverywhere() {
    if (isPremium) {
      if (canDeleteEverywhere && typeof deleteEverywhereFn === 'function') {
        deleteEverywhereFn();
      }
    } else {
      showGetPremiumPopup();
    }
  }

  return (
    <div className="message-form">
      <div className="message-form__button-container">
        <button
          className={deleteClasses}
          onTouchTap={deleteMessages}
        >
          {i18n.t('buttons.messenger.select_form.delete')}
        </button>
        <button
          className={deleteEverywhereClasses}
          onTouchTap={deleteMessagesEverywhere}
        >
          {i18n.t('buttons.messenger.select_form.delete_everywhere')}
        </button>
        <button
          className={replyClasses}
          onTouchTap={setReplyToId}
        >
          {i18n.t('buttons.messenger.select_form.reply')}
        </button>
        <button
          className="message-form__button --white --cancel-button"
          onTouchTap={stopSelect}
        >
          {i18n.t('buttons.messenger.select_form.cancel')}
        </button>
      </div>
    </div>
  );
}

SelectForm.propTypes = {
  canDelete: PropTypes.bool.isRequired,
  canDeleteEverywhere: PropTypes.bool.isRequired,
  canReply: PropTypes.bool.isRequired,
  deleteEverywhereFn: PropTypes.func.isRequired,
  deleteFn: PropTypes.func.isRequired,
  isPremium: PropTypes.bool.isRequired,
  setReplyToId: PropTypes.func.isRequired,
  showGetPremiumPopup: PropTypes.func.isRequired,
  stopSelect: PropTypes.func.isRequired,
};

export default connect(
  (state, { conversation, messages }) => {
    const isPremium = !!state.currentUser.data.isPremium;
    const conversationUserId = conversation.get('userId');
    const selectedIds = state.msg.thread.get('selectedIds', Set());
    const canDelete = selectedIds.count() > 0;
    const canReply = selectedIds.count() === 1;
    const canDeleteEverywhere = canDelete && selectedIds
      // selection has only own messages
      .every((id) => messages.getIn([String(id), 'userId']) === conversationUserId);

    return {
      canDelete,
      canDeleteEverywhere,
      canReply,
      conversation,
      isPremium,
    };
  },
  {
    stopSelect,
    setReplyToId,
    deleteMessages,
    showGetPremiumPopup,
  },
  (stateProps, dispatchProps) => Object.assign(
    stateProps,
    dispatchProps,
    {
      deleteFn: () => dispatchProps.deleteMessages(
        stateProps.conversationId,
        stateProps.selectedIds
      ),
      deleteEverywhereFn: () => dispatchProps.deleteMessages(
        stateProps.conversationId,
        stateProps.selectedIds,
        true
      ),
    }
  )
)(SelectForm);
