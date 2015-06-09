import React, {PropTypes} from 'react';
import RelationshipsContainer from '../Relationships/RelationshipsContainer';
import RequestButton from '../common/RequestButton';

export default class FlowManagerRequests {
  static propTypes = {
    flow: PropTypes.object.isRequired,
    onCountUpdate: PropTypes.func
  }
  render() {
    let objectID = this.props.flow.id;

    return (
      <RelationshipsContainer
          url={ApiRoutes.tlogRelationshipsBy(objectID, 'requested')}
          onCountUpdate={this.props.onCountUpdate}>
        <RequestButton objectID={objectID} />
      </RelationshipsContainer>
    );
  }
}