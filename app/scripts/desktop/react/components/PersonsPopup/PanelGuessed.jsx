/*global RelationshipsStore, RequesterMixin, ComponentManipulationsMixin, ScrollerMixin */
import React, { createClass } from 'react';
import PanelMixin from './PanelMixin';
import ApiRoutes from '../../../../shared/routes/api';
import RelationshipGuessed from './RelationshipGuessed';

const PanelGuessed = createClass({
  mixins: [ 'ReactActivitiesUser', RequesterMixin, ComponentManipulationsMixin, ScrollerMixin, PanelMixin ],
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
