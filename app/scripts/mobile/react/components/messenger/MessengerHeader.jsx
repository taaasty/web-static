import React, { PropTypes } from 'react';

function MessengerHeader({ onClose, title }) {
  return (
    <div className="messages__header">
      <h3 className="messages__title">
        {title}
      </h3>
      {onClose &&
       <span className="messages__close" onClick={onClose}>
         <i className="icon icon--cross" />
       </span>
      }
    </div>
  );
}

MessengerHeader.displayName = 'MessengerHeader';

MessengerHeader.propTypes = {
  onClose: PropTypes.func,
  title: PropTypes.string.isRequired,
};

export default MessengerHeader;
