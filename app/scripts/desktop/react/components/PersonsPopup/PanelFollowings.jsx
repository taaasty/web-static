/*global RelationshipsStore, RequesterMixin, ComponentManipulationsMixin, ScrollerMixin */
import React, { createClass } from 'react';
import PanelMixin from './PanelMixin';
import ApiRoutes from '../../../../shared/routes/api';
import RelationshipFollowing from './RelationshipFollowing';

const PanelFollowings = createClass({
  mixins: [ RequesterMixin, ComponentManipulationsMixin, ScrollerMixin, PanelMixin ],
  relationshipType: 'followings',
  itemClass() {
    return RelationshipFollowing;
  },

  relationUrl() {
    return ApiRoutes.relationships_to_url('friend');
  },

  getStateFromStore() {
    return {
      relationships: RelationshipsStore.getFollowings(),
      totalCount: RelationshipsStore.getFollowingsTotalCount(),
    };
  },
});

export default PanelFollowings;
