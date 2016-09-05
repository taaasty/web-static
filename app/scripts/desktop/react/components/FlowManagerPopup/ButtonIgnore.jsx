/*global i18n */
import React, { PropTypes } from 'react';

function ButtonIgnore({ isError, isFetching, onClick }) {
  function title() {
    return isError ? i18n.t('follow_button_error')
         : isFetching ? i18n.t('follow_button_process')
         : (
           <span>
             <span className="follow-button__title--hover">
               {i18n.t('follow_button_unblock')}
             </span>
             <span className="follow-button__title--nohover">
               {i18n.t('follow_button_ignored')}
             </span>
           </span>
         );
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

ButtonIgnore.propTypes = {
  isError: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
 };

export default ButtonIgnore;
