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
    const { canLoad, children, currentUser, flows, loading, onLoadMoreFlows } = this.props;

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
            {flows.map((item) => (
               <FlowBrick
                 currentUser={currentUser}
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

FlowBricks.displayName = 'FlowBricks';

FlowBricks.propTypes = {
  canLoad: PropTypes.bool.isRequired,
  currentUser: PropTypes.object.isRequired,
  flows: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onLoadMoreFlows: PropTypes.func.isRequired,
};

export default FlowBricks;
