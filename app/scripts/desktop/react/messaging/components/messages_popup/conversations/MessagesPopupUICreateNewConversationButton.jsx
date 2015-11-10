/*global i18n */
import React, { PropTypes } from 'react';

class MessagesPopupUICreateNewConversationButton {
  render() {
    return (
      <span
        className="button button--green"
        onClick={ this.props.onClick }
      >
        <span className="button__inner">
          <span className="button__text">
            {i18n.t('new_thread_button')} 
          </span>
        </span>
      </span>
    );
  }
}
MessagesPopupUICreateNewConversationButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default MessagesPopupUICreateNewConversationButton;
