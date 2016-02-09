import React, { PropTypes } from 'react';
import RelationshipsContainer from '../Relationships/RelationshipsContainer';
import UnfollowButton from '../common/UnfollowButton';
import ApiRoutes from '../../../../shared/routes/api';

function Followers({ FlowActions, flow: { id } }) {
  return (
    <RelationshipsContainer
      onCountUpdate={(followersCount) => FlowActions.flowReceive({ followersCount })}
      url={ApiRoutes.tlogRelationshipsBy(id, 'friend')}
    >
      <UnfollowButton objectID={id} />
    </RelationshipsContainer>
  );
}

Followers.propTypes = {
  FlowActions: PropTypes.object.isRequired,
  flow: PropTypes.object.isRequired,
};

export default Followers;
