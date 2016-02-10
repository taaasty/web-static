import React, { PropTypes } from 'react';

function EntryTlogActions({ onAccept, onDecline }) {
  return (
    <div className="post__actions">
      <div className="moderator-actions">
        <div className="moderator-action moderator-action--accept"
             onClick={onAccept}>
          <i className="icon icon--tick" />
        </div>
        <div className="moderator-action moderator-action--reject"
             onClick={onDecline}>
          <i className="icon icon--cross" />
        </div>
      </div>
    </div>
  );
}

EntryTlogActions.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
};

export default EntryTlogActions;
