import React, { PropTypes } from 'react';
import MessageContents from './MessageList/MessageContents';

function ThreadFormReplyTo(props) {
  const {
    cancel,
    message,
    messageAuthor,
  } = props;

  return (
    <div className="message-form__reply-container">
      <div className="message-form__reply-close" onClick={cancel}>
        <i className="icon icon--cross" />
      </div>
      <div className="message--reply">
        <MessageContents
          maxWidth={60}
          message={message}
          messageAuthor={messageAuthor}
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
  messageAuthor: PropTypes.object.isRequired,
};

export default ThreadFormReplyTo;
