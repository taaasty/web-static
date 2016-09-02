import React, { Component, PropTypes } from 'react';
import EntryTlogs from './EntryTlogs';
import {
  BY_ENTRIES_LIMIT,
  getTlogEntriesCommentsIfNeeded,
} from '../../actions/CommentsActions';
import {
  getTlogEntriesPermissionsIfNeeded,
  getTlogEntriesRatingsIfNeeded,
} from '../../actions/TlogEntriesActions';
import { connect } from 'react-redux';
import { Map, fromJS } from 'immutable';

const emptyEntry = Map();

class EntryTlogsContainer extends Component {
  componentWillMount() {
    this.fetchNeededData(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.fetchNeededData(nextProps);
  }
  fetchNeededData(props) {
    const {
      fetchCommentsEntries,
      fetchPermissionsEntries,
      fetchRatingsEntries,
      getTlogEntriesCommentsIfNeeded,
      getTlogEntriesPermissionsIfNeeded,
      getTlogEntriesRatingsIfNeeded,
    } = props;

    if (!fetchCommentsEntries.isEmpty()) {
      getTlogEntriesCommentsIfNeeded(fetchCommentsEntries);
    }

    if (!fetchPermissionsEntries.isEmpty()) {
      getTlogEntriesPermissionsIfNeeded(fetchPermissionsEntries);
    }

    if (!fetchRatingsEntries.isEmpty()) {
      getTlogEntriesRatingsIfNeeded(fetchRatingsEntries);
    }
  }
  render() {
    const {
      entries: {
        isFetching,
        data: {
          items,
          hasMore,
        },
      },
      handleDeleteEntry,
      hostTlogId,
      isFeed,
      loadMoreEntries,
    } = this.props;

    return (
      <EntryTlogs
        canLoad={!isFetching && !!hasMore}
        entries={items}
        hostTlogId={hostTlogId}
        isFeed={isFeed}
        loading={isFetching}
        onDelete={handleDeleteEntry}
        onLoadMoreEntries={loadMoreEntries}
      />
    );
  }
}

EntryTlogsContainer.propTypes = {
  entries: PropTypes.shape({
    data: PropTypes.shape({
      items: PropTypes.array.isRequired,
      hasMore: PropTypes.bool,
    }).isRequired,
    isFetching: PropTypes.bool,
  }).isRequired,
  fetchCommentsEntries: PropTypes.object.isRequired,
  fetchPermissionsEntries: PropTypes.object.isRequired,
  fetchRatingsEntries: PropTypes.object.isRequired,
  handleDeleteEntry: PropTypes.func,
  hostTlogId: PropTypes.number,
  isFeed: PropTypes.bool,
  loadMoreEntries: PropTypes.func,
};

export default connect(
  (state, { entries }) => {
    const { items } = entries.data;
    const tEntries = fromJS(items)
      .toMap()
      .mapKeys((_, id) => id)
      .map((id) => state.entities.getIn(['entry', String(id)], emptyEntry));
    const fetchCommentsEntries = tEntries
      .filter((e, id) => e.get('commentsCount', 0) > 0 &&
        state
          .entities
          .get('comment')
          .filter((c) => String(c.get('entryId')) === String(id))
          .count() < Math.min(e.get('commentsCount', 0), BY_ENTRIES_LIMIT)
      );
    const fetchPermissionsEntries = tEntries
      .filter((e, id) => !e.has('canDelete') && !state.entities.getIn(['permission', String(id)]));
    const fetchRatingsEntries = tEntries
      .filter((e, id) => !state.entities.getIn(['rating', String(id)]));

    return {
      fetchCommentsEntries,
      fetchPermissionsEntries,
      fetchRatingsEntries,
    };
  },
  {
    getTlogEntriesCommentsIfNeeded,
    getTlogEntriesRatingsIfNeeded,
    getTlogEntriesPermissionsIfNeeded,
  }
)(EntryTlogsContainer);
