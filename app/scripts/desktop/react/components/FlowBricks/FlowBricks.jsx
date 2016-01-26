import React, { Component, PropTypes } from 'react';
import FlowBrick from '../Flow/FlowBrick';
import InfiniteScroll from '../common/InfiniteScroll';
import Masonry from 'react-masonry-component';

const masonryOptions = {
  itemSelector: '.brick',
  transitionDuration: 0,
  isFitWidth: true,
  gutter: 20,
};

class Bricks extends Component {
  render() {
    const { canLoad, flows, loading, onLoadMoreFlows } = this.props;

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
            {flows.map((item) => (
               <FlowBrick
                 flow={item.flow}
                 key={item.flow.id}
                 relationship={item.relationship}
               />))
            }
          </Masonry>
        </InfiniteScroll>
      </div>
    );
  }
}

Bricks.propTypes = {
  canLoad: PropTypes.bool.isRequired,
  flows: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onLoadMoreFlows: PropTypes.func.isRequired,
};

export default Bricks;
