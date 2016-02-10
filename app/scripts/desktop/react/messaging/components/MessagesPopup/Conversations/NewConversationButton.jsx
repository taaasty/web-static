/*global i18n */
import React, { PropTypes } from 'react';

function NewConversationButton(props) {
  return (
    <span
      className="button button--green"
      onClick={props.onClick}
    >
      <span className="button__inner">
        <span className="button__text">
          {i18n.t('new_thread_button')} 
        </span>
      </span>
    </span>
  );
}

NewConversationButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default NewConversationButton;
