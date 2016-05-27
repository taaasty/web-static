/*global RelationshipIgnoreButton */
import React, { Component, PropTypes } from 'react';
import PersonItem from './PersonItem';

class RelationshipIgnored extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.relationship.state !== nextProps.relationship.state;
  }
  render() {
    const { relationship } = this.props;

    return (
      <PersonItem user={relationship.user}>
        <RelationshipIgnoreButton relationship={relationship} />
      </PersonItem>      
    );
  }
}

RelationshipIgnored.propTypes = {
  relationship: PropTypes.object.isRequired,
};

export default RelationshipIgnored;
