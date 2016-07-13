/*global RelationshipsStore, RequesterMixin, ComponentManipulationsMixin, ScrollerMixin */
import React, { createClass } from 'react';
import PanelMixin from './PanelMixin';
import ApiRoutes from '../../../../shared/routes/api';
import RelationshipRequested from './RelationshipRequested';

const PanelRequested = createClass({
  mixins: [ RequesterMixin, ComponentManipulationsMixin, ScrollerMixin, PanelMixin ],
  relationshipType: 'requested',
  itemClass() {
    return RelationshipRequested;
  },

  relationUrl() {
    return ApiRoutes.relationships_by_url('requested');
  },

  getStateFromStore() {
    return {
      relationships: RelationshipsStore.getRequested(),
      totalCount: RelationshipsStore.getRequestedTotalCount(),
    };
  },
});

export default PanelRequested;
