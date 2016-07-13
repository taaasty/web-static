/*global RelationshipFollowerButton */
import React, { Component, PropTypes } from 'react';
import PersonItem from './PersonItem';

class RelationshipFollower extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.relationship.state !== nextProps.relationship.state;
  }
  render() {
    const { relationship } = this.props;

    return (
      <PersonItem user={relationship.reader}>
        <RelationshipFollowerButton relationship={relationship} />
      </PersonItem>      
    );
  }
}

RelationshipFollower.propTypes = {
  relationship: PropTypes.object.isRequired,
};

export default RelationshipFollower;
