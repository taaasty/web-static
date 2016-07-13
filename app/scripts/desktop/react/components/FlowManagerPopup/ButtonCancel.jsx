/*global i18n */
import React, { PropTypes } from 'react';

function ButtonCancel({ isError, isFetching, onClick }) {
  function title() {
    return isError ? i18n.t('follow_button_error')
      : isFetching ? i18n.t('follow_button_process')
      : i18n.t('follow_button_block');
  }
  
  return (
    <button
      className="follow-button"
      onTouchTap={onClick}
      style={{display: 'inline-block!important'}}
    >
      {title()}
    </button>
  );
}

ButtonCancel.propTypes = {
  isError: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onCilck: PropTypes.func.isRequired,
};

export default ButtonCancel;
