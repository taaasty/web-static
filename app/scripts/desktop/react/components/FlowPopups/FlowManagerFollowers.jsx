import React, {PropTypes} from 'react';
import RelationshipsContainer from '../Relationships/RelationshipsContainer';
import UnfollowButton from '../common/UnfollowButton';

export default class FlowManagerFollowers {
  static propTypes = {
    flow: PropTypes.object.isRequired,
    onCountUpdate: PropTypes.func
  }
  render() {
    let objectID = this.props.flow.id;

    return (
      <RelationshipsContainer
          url={ApiRoutes.tlogRelationshipsBy(objectID, 'friend')}
          onCountUpdate={this.props.onCountUpdate}>
        <UnfollowButton objectID={objectID} />
      </RelationshipsContainer>
    );
  }
}