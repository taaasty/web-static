/*global RelationshipRequestButton */
import React, { Component, PropTypes } from 'react';
import PersonItem from './PersonItem';

class RelationshipFollower extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.relationship.state !== nextProps.relationship.state;
  }
  render() {
    const { key, relationship } = this.props;

    return (
      <PersonItem user={relationship.reader}>
        <RelationshipRequestButton key={key} relationship={relationship} />
      </PersonItem>      
    );
  }
}

RelationshipFollower.propTypes = {
  key: PropTypes.string.isRequired,
  relationship: PropTypes.object.isRequired,
};

export default RelationshipFollower;
