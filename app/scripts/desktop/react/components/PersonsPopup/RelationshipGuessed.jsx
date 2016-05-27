/*global RelationshipGuessButton */
import React, { Component, PropTypes } from 'react';
import PersonItem from './PersonItem';

class RelationshipGuessed extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.relationship.state !== nextProps.relationship.state;
  }
  render() {
    const { key, onRequestEnd, relationship } = this.props;

    return (
      <PersonItem user={relationship.user}>
        <RelationshipGuessButton
          key={key}
          onRequestEnd={onRequestEnd}
          relationship={relationship}
        />
      </PersonItem>      
    );
  }
}

RelationshipGuessed.propTypes = {
  key: PropTypes.string.isRequired,
  onRequestEnd: PropTypes.func,
  relationship: PropTypes.object.isRequired,
};

export default RelationshipGuessed;
