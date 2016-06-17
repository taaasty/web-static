import React, { PropTypes } from 'react';
import FollowStatus from '../common/FollowStatus';
import { REL_GUESSED_STATE,  REL_NONE_STATE } from '../RelationButton';
import { connect } from 'react-redux';
import { follow } from '../../actions/RelationshipActions';
import { Map } from 'immutable';

function SmartFollowStatus({ follow, rel, relId, relState }) {
  const isFetching = relState.get('isFetching', false);
  const error = relState.get('error', null);
  const status = rel.get('state', REL_NONE_STATE);
  
  function handleClick() {
    if (!error && !isFetching && (status === REL_GUESSED_STATE || status === REL_NONE_STATE)) {
      follow(rel.get('userId'), relId);
    }
  }

  return (
    <FollowStatus
      error={error}
      onClick={handleClick}
      process={isFetching}
      status={status}
    />
  );
}

SmartFollowStatus.propTypes = {
  follow: PropTypes.func.isRequired,
  rel: PropTypes.object.isRequired,
  relId: PropTypes.number.isRequired,
  relState: PropTypes.object.isRequired,
};

export default connect(
  (state, { relId }) => {
    const rel = state.entities.getIn([ 'rel', relId ], Map());
    const relState = state.relState.get(relId, Map());

    return {
      rel,
      relId,
      relState,
    };
  },
  { follow }
)(SmartFollowStatus);
