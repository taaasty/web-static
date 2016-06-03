import React, { PropTypes } from 'react';
import MessageContents from './MessageList/MessageContents';

function ThreadFormReplyTo({ cancel, message, messageInfo }) {
  return (
    <div className="message-form__reply-container">
      <div className="message-form__reply-close" onClick={cancel} />
      <div className="message-form__reply-message">
        <MessageContents
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
