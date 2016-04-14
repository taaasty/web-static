import React, { Component, PropTypes } from 'react';

import FlowsNav from './FlowsNav';
import FlowsListItem from './FlowsListItem';
import FeedLoadMore from '../feed/loadMore';

class FlowsList extends Component {
  state = { width: 0 };
  componentDidMount() {
    if (this.refs.container) {
      this.setState({ width: this.refs.container.parentNode.offsetWidth });
    }
  }
  render() {
    const { flows, hasMore, isFetching, loadMore, sort } = this.props;

    return (
      <div className="flows" ref="container">
        <FlowsNav sort={sort} />
        <div className="flows__list">
          {flows.map((flow, idx) => (
             <FlowsListItem
               flow={flow}
               key={`flow-${idx}`}
               width={this.state.width}
             />
           ))}
        </div>
        {hasMore && <FeedLoadMore loading={isFetching} onClick={loadMore} />}
      </div>
    );
  }
}

FlowsList.displayName = 'FlowsList';

FlowsList.propTypes = {
  flows: PropTypes.array.isRequired,
  hasMore: PropTypes.bool,
  isFetching: PropTypes.bool,
  loadMore: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
};

export default FlowsList;
