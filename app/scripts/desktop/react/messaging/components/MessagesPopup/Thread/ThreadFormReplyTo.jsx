import React, { PropTypes } from 'react';
import MessageContents from './MessageList/MessageContents';

function ThreadFormReplyTo({ cancel, message, messageInfo }) {
  return (
    <div className="message-form__reply-container">
      <div className="message-form__reply-close" onClick={cancel}>
        <i className="icon icon--cross" />
      </div>
      <div className="message--reply">
        <MessageContents
          maxWidth={60}
          message={message}
          messageInfo={messageInfo}
          showSlug
          showSupportInfo={false}
        />
      </div>
    </div>
  );
}

ThreadFormReplyTo.displayName = 'ThreadFormReplyTo';

ThreadFormReplyTo.propTypes = {
  cancel: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
  messageInfo: PropTypes.object.isRequired,
};

ThreadFormReplyTo.defaultProps = {
  message: {},
  messageInfo: {
    user: {},
  },
};

export default ThreadFormReplyTo;
