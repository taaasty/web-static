/*global RelationshipsStore, RequesterMixin, ComponentManipulationsMixin, ScrollerMixin */
import React, { createClass } from 'react';
import PanelMixin from './PanelMixin';
import ApiRoutes from '../../../../shared/routes/api';
import RelationshipFollower from './RelationshipFollower';

const PanelFollowers = createClass({
  mixins: [ RequesterMixin, ComponentManipulationsMixin, ScrollerMixin, PanelMixin ],
  relationshipType: 'followers',
  itemClass() {
    return RelationshipFollower;
  },

  relationUrl() {
    return ApiRoutes.relationships_by_url('friend');
  },

  getStateFromStore() {
    return {
      relationships: RelationshipsStore.getFollowers(),
      totalCount: RelationshipsStore.getFollowersTotalCount(),
    };
  },
});

export default PanelFollowers;
