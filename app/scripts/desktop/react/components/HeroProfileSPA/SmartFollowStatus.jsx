import React, { PropTypes } from 'react';
import FollowStatus from '../common/FollowStatus';

const STATE_NONE = 'none';
const STATE_GUESSED = 'guessed';

function SmartFollowStatus({ error, follow, isFetching, relState }) {
  function handleClick() {
    if (!error && !isFetching && (relState === STATE_NONE || relState === STATE_GUESSED)) {
      follow();
    }
  }

  return (
    <FollowStatus
      error={error}
      onClick={handleClick}
      process={isFetching}
      status={relState}
    />
  );
}

SmartFollowStatus.propTypes = {
  error: PropTypes.object,
  follow: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  relState: PropTypes.string.isRequired,
};

export default SmartFollowStatus;
