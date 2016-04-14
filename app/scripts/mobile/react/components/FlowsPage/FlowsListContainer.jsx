import React, { Component, PropTypes } from 'react';

import FlowsActions from '../../actions/view/FlowsActions';
import FlowsList from './FlowsList';
import FlowsStore from '../../stores/FlowsStore';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';

class FlowsListContainer extends Component {
  loadMore() {
    const { flows: { has_more, next_page }, sort } = this.props;

    if (has_more) {
      FlowsActions.loadMore(sort, next_page);
    }
  }
  render() {
    const { flows: { has_more, items }, isFetching, sort } = this.props;

    return (
      <FlowsList
        flows={items}
        hasMore={has_more}
        isFetching={isFetching}
        loadMore={this.loadMore.bind(this)}
        sort={sort}
      />
    );
  }
}

FlowsListContainer.displayName = 'FlowsListContainer';

FlowsListContainer.propTypes = {
  flows: PropTypes.shape({
    items: PropTypes.array.isRequired,
    has_more: PropTypes.bool.isRequired,
    next_page: PropTypes.number,
  }).isRequired,
  isFetching: PropTypes.bool,
  sort: PropTypes.string.isRequired,
};

export default connectToStores(
  FlowsListContainer,
  [ FlowsStore ],
  FlowsStore.getStore
);
