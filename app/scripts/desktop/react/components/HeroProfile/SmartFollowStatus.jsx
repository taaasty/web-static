import React, { PropTypes } from 'react';
import FollowStatus from '../common/FollowStatus';
import { REL_GUESSED_STATE,  REL_NONE_STATE } from '../RelationButton';

function SmartFollowStatus({ error, follow, isFetching, relState }) {
  function handleClick() {
    if (!error && !isFetching && (relState === REL_GUESSED_STATE || relState === REL_NONE_STATE)) {
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
  relState: PropTypes.string,
};

export default SmartFollowStatus;
