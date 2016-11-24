import React, { Component, PropTypes } from 'react';
import EntryBricks from './EntryBricks';
import {
  getTlogEntriesRatingsIfNeeded,
} from '../../actions/TlogEntriesActions';
import {
  isAdsId,
} from '../../actions/AdsActions';
import {
  ENTRY_TYPE_ANONYMOUS,
} from '../../constants/EntryConstants';
import { connect } from 'react-redux';
import { Map, fromJS } from 'immutable';

const emptyEntry = Map();

class EntryBricksContainer extends Component {
  componentWillMount() {
    this.fetchNeededData(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.fetchNeededData(nextProps);
  }
  fetchNeededData(props) {
    const {
      fetchRatingsEntries,
      getTlogEntriesRatingsIfNeeded,
    } = props;

    if (!fetchRatingsEntries.isEmpty()) {
      getTlogEntriesRatingsIfNeeded(fetchRatingsEntries);
    }
  }
  render() {
    const {
      children,
      entries: {
        isFetching,
        data: {
          items,
          hasMore,
        },
      },
      hostTlogId,
      loadMoreEntries,
    } = this.props;

    return (
      <EntryBricks
        canLoad={!isFetching && !!hasMore}
        entries={items}
        hostTlogId={hostTlogId}
        loading={isFetching}
        onLoadMoreEntries={loadMoreEntries}
      >
        {children}
      </EntryBricks>
    );
  }
}

EntryBricksContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  entries: PropTypes.shape({
    data: PropTypes.shape({
      items: PropTypes.array.isRequired,
      hasMore: PropTypes.bool,
    }).isRequired,
    isFetching: PropTypes.bool,
  }).isRequired,
  fetchRatingsEntries: PropTypes.object.isRequired,
  getTlogEntriesRatingsIfNeeded: PropTypes.func.isRequired,
  hostTlogId: PropTypes.number,
  loadMoreEntries: PropTypes.func.isRequired,
};

export default connect(
  (state, { entries }) => {
    const {
      entities,
      ratingState,
    } = state;
    const { items } = entries.data;
    const tEntries = fromJS(items)
      .toMap()
      .mapKeys((_, id) => id)
      .map((id) => entities.getIn(['entry', String(id)], emptyEntry));
    const fetchRatingsEntries = tEntries
      .filter((e, id) => (
        !isAdsId(id) &&
        e.get('type') !== ENTRY_TYPE_ANONYMOUS &&
        e.get('isVoteable') === true &&
        !entities.getIn(['rating', String(id)]) &&
        !ratingState.getIn([id, 'isFetching'])
      ));

    return {
      fetchRatingsEntries,
    };
  },
  {
    getTlogEntriesRatingsIfNeeded,
  }
)(EntryBricksContainer);
