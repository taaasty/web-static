import React, { PropTypes } from 'react';
import ConversationActions from '../../../messaging/actions/ConversationActions';

class WriteMessageButton {
  handleClick() {
    ConversationActions.openConversation(this.props.user.id);
  }
  render() {
    return (
      <button
        className="write-message-button"
        onClick={this.handleClick.bind(this)}
      >
        <i className="icon icon--messages" />
      </button>
    );
  }
}

WriteMessageButton.propTypes = {
  user: PropTypes.object.isRequired,
};

export default WriteMessageButton;
