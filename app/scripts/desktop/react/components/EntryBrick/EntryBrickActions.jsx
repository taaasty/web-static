import React, { PropTypes } from 'react';

function EntryBrickActions(props) {
  const {
    hasModeration,
    onAccept,
    onDecline,
  } = props;

  return hasModeration
    ? (
      <div className="brick__actions">
        <div className="moderator-actions">
          <div
            className="moderator-action moderator-action--accept"
            onClick={onAccept}
          >
            <i className="icon icon--tick" />
          </div>
          <div
            className="moderator-action moderator-action--reject"
            onClick={onDecline}
          >
            <i className="icon icon--cross" />
          </div>
        </div>
      </div>
    )
    : <noscript />;
}

EntryBrickActions.propTypes = {
  hasModeration: PropTypes.bool.isRequired,
  onAccept: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
};

export default EntryBrickActions;
