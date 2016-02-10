/*global i18n */
import React, { PropTypes } from 'react';

function NewGroupChatButton({ onClick, selectState }) {
  return (
    <span
      className="button button--green"
      onClick={onClick}
    >
      <span className="button__inner">
        <span className="button__text">
          {i18n.t(`buttons.messenger.${selectState ? 'new_group_next' : 'new_group_chat'}`)} 
        </span>
      </span>
    </span>
  );
}

NewGroupChatButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  selectState: PropTypes.bool.isRequired,
};

export default NewGroupChatButton;
