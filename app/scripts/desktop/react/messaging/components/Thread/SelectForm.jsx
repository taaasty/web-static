/*global i18n */
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import {
  stopSelect,
  setReplyToUuid,
} from '../../actions/ThreadActions';
import {
  deleteMessages,
} from '../../actions/ConversationActions';
import {
  showGetPremiumPopup,
} from '../../../actions/AppStateActions';
import { connect } from 'react-redux';
import { Set } from 'immutable';

function SelectForm(props) {
  const {
    canDelete,
    canDeleteEverywhere,
    canReply,
    deleteEverywhereFn,
    deleteFn,
    isPremium,
    setReplyToUuid,
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
          onTouchTap={setReplyToUuid}
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
  setReplyToUuid: PropTypes.func.isRequired,
  showGetPremiumPopup: PropTypes.func.isRequired,
  stopSelect: PropTypes.func.isRequired,
};

export default connect(
  (state, { conversation, messages }) => {
    const isPremium = !!state.currentUser.data.isPremium;
    const conversationUserId = conversation.get('userId');
    const selectedUuids = state.msg.thread.get('selectedUuids', Set());
    const canDelete = selectedUuids.count() > 0;
    const canReply = selectedUuids.count() === 1;
    const canDeleteEverywhere = canDelete && selectedUuids
      // selection has only own messages
      .every((uuid) => messages.getIn([String(uuid), 'userId']) === conversationUserId);

    return {
      canDelete,
      canDeleteEverywhere,
      canReply,
      conversation,
      isPremium,
      selectedUuids,
    };
  },
  {
    stopSelect,
    setReplyToUuid,
    deleteMessages,
    showGetPremiumPopup,
  },
  (stateProps, dispatchProps) => Object.assign(
    stateProps,
    dispatchProps,
    {
      deleteFn: () => dispatchProps.deleteMessages(
        stateProps.conversationId,
        stateProps.selectedUuids
      ),
      deleteEverywhereFn: () => dispatchProps.deleteMessages(
        stateProps.conversationId,
        stateProps.selectedUuids,
        true
      ),
      setReplyToUuid: () => dispatchProps.setReplyToUuid(
        stateProps.selectedUuids.first()
      ),
    }
  )
)(SelectForm);
