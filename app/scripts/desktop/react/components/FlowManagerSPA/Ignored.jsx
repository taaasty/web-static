import React, {PropTypes} from 'react';
import RelationshipsContainer from '../Relationships/RelationshipsContainer';
import IgnoreButton from '../common/IgnoreButton';

export default class FlowManagerIgnored {
  static propTypes = {
    flow: PropTypes.object.isRequired,
    onCountUpdate: PropTypes.func,
  };
  render() {
    let objectID = this.props.flow.id;

    return (
      <RelationshipsContainer
          url={ApiRoutes.tlogRelationshipsTo(objectID, 'ignored')}
          onCountUpdate={this.props.onCountUpdate}>
        <IgnoreButton objectID={objectID} />
      </RelationshipsContainer>
    );
  }
}
