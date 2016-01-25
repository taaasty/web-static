/*global i18n */
import React, { PropTypes } from 'react';
import classNames from 'classnames';

function SelectForm({ canDelete, canDeleteEverywhere, deleteFn, deleteEverywhereFn, stopSelect }) {
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

  function deleteMessages() {
    if (canDelete && typeof deleteFn === 'function')
      deleteFn();
  }

  function deleteMessagesEverywhere() {
    if (canDeleteEverywhere && typeof deleteEverywhereFn === 'function') {
      deleteEverywhereFn();
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
          className="message-form__button --white"
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
  deleteEverywhereFn: PropTypes.func.isRequired,
  deleteFn: PropTypes.func.isRequired,
  stopSelect: PropTypes.func.isRequired,
};

export default SelectForm;
