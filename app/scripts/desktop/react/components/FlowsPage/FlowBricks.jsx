import React, { Component, PropTypes } from 'react';
import FlowBrick from './FlowBrick';
import InfiniteScroll from '../common/InfiniteScroll';
import Masonry from 'react-masonry-component';

const masonryOptions = {
  itemSelector: '.brick',
  transitionDuration: 0,
  isFitWidth: true,
  gutter: 20,
  stamp: '.navs-line',
};

class FlowBricks extends Component {
  render() {
    const { canLoad, children, flows, loading, onLoadMoreFlows } = this.props;

    return (
      <div className="bricks-wrapper">
        <InfiniteScroll
          canLoad={canLoad}
          loading={loading}
          onLoad={onLoadMoreFlows}
        >
          <Masonry
            className="bricks"
            elementType="section"
            options={masonryOptions}
          >
            {children}
            {flows.map((flow) => <FlowBrick flow={flow} key={flow.get('id')} />)}
          </Masonry>
        </InfiniteScroll>
      </div>
    );
  }
}

FlowBricks.displayName = 'FlowBricks';

FlowBricks.propTypes = {
  canLoad: PropTypes.bool.isRequired,
  flows: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onLoadMoreFlows: PropTypes.func.isRequired,
};

export default FlowBricks;
