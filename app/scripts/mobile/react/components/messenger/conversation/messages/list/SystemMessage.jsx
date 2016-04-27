import React, { PropTypes } from 'react';

function SystemMessage({ message }) {
  return (
    <div className="message message--system">
      <span
        className="message__text"
        dangerouslySetInnerHTML={{ __html: message.content_html }}
      />
    </div>
  );
}

SystemMessage.displayName = 'SystemMessage';

SystemMessage.propTypes = {
  message: PropTypes.object.isRequired,
};

export default SystemMessage;
