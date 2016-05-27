/*global FollowButton */
import React, { Component, PropTypes } from 'react';
import PersonItem from './PersonItem';

class RelationshipFollowing extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.relationship.state !== nextProps.relationship.state;
  }
  render() {
    const { relationship } = this.props;

    return (
      <PersonItem user={relationship.user}>
        <FollowButton relationship={relationship} />
      </PersonItem>      
    );
  }
}

RelationshipFollowing.propTypes = {
  relationship: PropTypes.object.isRequired,
};

export default RelationshipFollowing;
