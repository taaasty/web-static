import React, {PropTypes} from 'react';
import RelationshipsContainer from '../Relationships/RelationshipsContainer';
import IgnoreButton from '../common/IgnoreButton';
import ApiRoutes from '../../../../shared/routes/api';

function Ignored({ FlowActions, flow: { id } }) {
  return (
    <RelationshipsContainer
      onCountUpdate={(ignoredCount) => FlowActions.flowReceive({ ignoredCount })}
      url={ApiRoutes.tlogRelationshipsTo(id, 'ignored')}
    >
      <IgnoreButton objectID={id} />
    </RelationshipsContainer>
  );
}

Ignored.propTypes = {
  FlowActions: PropTypes.object.isRequired,
  flow: PropTypes.object.isRequired,
};

export default Ignored;
