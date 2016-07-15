/*global RelationshipsStore, RequesterMixin, ComponentManipulationsMixin, ScrollerMixin */
import React, { createClass } from 'react';
import PanelMixin from './PanelMixin';
import ApiRoutes from '../../../../shared/routes/api';
import RelationshipGuessed from './RelationshipGuessed';

const PanelGuessed = createClass({
  mixins: [ RequesterMixin, ComponentManipulationsMixin, ScrollerMixin, PanelMixin ],
  relationshipType: 'guessed',
  itemClass() {
    return RelationshipGuessed;
  },

  relationUrl() {
    return ApiRoutes.relationships_to_url('guessed');
  },

  getStateFromStore() {
    return {
      relationships: RelationshipsStore.getGuessed(),
      totalCount: RelationshipsStore.getGuessedTotalCount(),
    };
  },
});

export default PanelGuessed;


/*

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

----------------------------------------------------------------

window.RelationshipGuessButton = React.createClass
  mixins: ['RelationshipMixin']

  propTypes:
    relationship: React.PropTypes.object.isRequired
    onRequestEnd: React.PropTypes.func

  getInitialState: ->
    isError:   false
    isProcess: false

  render: ->
    <div>
      <FollowButton relationship={ this.props.relationship } />
      <button onClick={ this.handleDisapproveClick }
              className="button button--small button--outline-light-white button--icon">
        <i className="icon icon--cross" />
      </button>
    </div>

  handleDisapproveClick: ->
    @cancel( success: => @props.onRequestEnd(@props.relationship) )
*/
