/*global i18n */
import React, { PropTypes } from 'react';

function ButtonRequest({ isError, isFetching, onApproveClick, onDeclineClick}) {
  function title() {
    return isError ? i18n.t('follow_button_error')
      : isFetching ? i18n.t('follow_button_process')
      : i18n.t('follow_button_approve');
  }

  return (
    <div>
      <button
        className="button button--small button--outline-light-white"
        onTouchTap={onApproveClick}
      >
        {title()}
      </button>
      <button
        className="button button--small button--outline-light-white button--icon"
        onTouchTap={onDeclineClick}
      >
        <i className="icon icon--cross" />
      </button>
    </div>
  );
}

ButtonRequest.propTypes = {
  isError: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onApproveClick: PropTypes.func.isRequired,
  onDeclineClick: PropTypes.func.isRequired,
};

export default ButtonRequest;
