import React, { createClass, PropTypes } from 'react';

import * as ProjectTypes from '../../../../shared/react/ProjectTypes';

import FeedStore from '../../stores/feed';
import ComponentMixin from '../../mixins/component';
import ConnectStoreMixin from '../../../../shared/react/mixins/connectStore';
import FeedMixin from '../feed/mixins/feed';
import FeedViewActions from '../../actions/view/feed';

import Feed from '../feed/feed';

const FeedFlow = createClass({
  displayName: 'FeedFlow',
  mixins: [ConnectStoreMixin(FeedStore), FeedMixin, ComponentMixin],
  propTypes: {
    flow: ProjectTypes.flow.isRequired,
    limit: PropTypes.number.isRequired,
  },
  
  loadMoreEntries() {
    const { flow: { id: flowId }, limit } = this.props;
    const { entries } = this.state;
    const sinceEntryId = entries[entries.length - 1].id;

    this.activateLoadingState();

    FeedViewActions.loadTlogEntries(flowId, sinceEntryId, limit)
      .then(this.activateShowState)
      .fail(this.activateErrorState);
  },
  
  render() {
    const { entries, everythingLoaded } = this.state;

    return (
      <Feed
        entries={entries}
        everythingLoaded={everythingLoaded}
        loading={this.isLoadingState()}
        onLoadMore={this.loadMoreEntries}
      />
    );
  },
})

export default FeedFlow;
