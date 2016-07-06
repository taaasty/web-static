import React, { PropTypes } from 'react';
import Relationships from '../Relationships';
import UnfollowButton from '../common/UnfollowButton';

function Followers({ flowId }) {
  return (
    <Relationships
    >
      <UnfollowButton objectId={flowId} />
    </Relationships>
  );
}

Followers.propTypes = {
  flowId: PropTypes.number.isRequired,
};

export default Followers;
