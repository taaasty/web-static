/*global RelationshipsStore, RequesterMixin, ComponentManipulationsMixin, ScrollerMixin */
import React, { createClass } from 'react';
import PanelMixin from './PanelMixin';
import ApiRoutes from '../../../../shared/routes/api';
import RelationshipIgnored from './RelationshipIgnored';

const PanelIgnored = createClass({
  mixins: [ 'ReactActivitiesUser', RequesterMixin, ComponentManipulationsMixin, ScrollerMixin, PanelMixin ],
  relationshipType: 'ignored',
  itemClass() {
    return RelationshipIgnored;
  },

  relationUrl() {
    return ApiRoutes.relationships_to_url('ignored');
  },

  getStateFromStore() {
    return {
      relationships: RelationshipsStore.getIgnored(),
      totalCount: RelationshipsStore.getIgnoredTotalCount(),
    };
  },
});

export default PanelIgnored;
