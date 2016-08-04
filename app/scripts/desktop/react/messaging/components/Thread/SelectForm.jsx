/*global i18n */
import React, { PropTypes } from 'react';
import classNames from 'classnames';
//import CurrentUserStore from '../../../stores/current_user';
import PopupActions from '../../../actions/PopupActions';

function SelectForm(props) {
  const { canDelete, canDeleteEverywhere, canReply, deleteFn,
          deleteEverywhereFn, setReplyTo, stopSelect } = props;
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
    if (CurrentUserStore.isPremium()) {
      if (canDeleteEverywhere && typeof deleteEverywhereFn === 'function') {
        deleteEverywhereFn();
      }
    } else {
      PopupActions.showGetPremiumPopup(); //TODO -> appstateactions
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
          onTouchTap={setReplyTo}
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
  setReplyTo: PropTypes.func.isRequired,
  stopSelect: PropTypes.func.isRequired,
};

export default SelectForm;
