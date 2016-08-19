import React, { PropTypes } from 'react';

function SystemMessage({ message }) {
  return (
    <div className="message--container">
      <div className="message message--system">
        <span
          className="messages__text"
          dangerouslySetInnerHTML={{ __html: message.get('contentHtml', '') }}
        />
      </div>
    </div>
  );
}

SystemMessage.displayName = 'SystemMessage';

SystemMessage.propTypes = {
  message: PropTypes.object.isRequired,
};

export default SystemMessage;
