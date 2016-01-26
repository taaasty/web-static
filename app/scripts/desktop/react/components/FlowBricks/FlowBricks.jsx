import React, { createClass, PropTypes } from 'react';
import FlowBrick from '../Flow/FlowBrick';
import InfiniteScroll from '../common/InfiniteScroll';
import MasonryMixin from 'react-masonry-mixin';

const masonryOptions = {
  itemSelector: '.brick',
  transitionDuration: 0,
  isFitWidth: true,
  gutter: 20,
};

const Bricks = createClass({
  propTypes: {
    canLoad: PropTypes.bool.isRequired,
    flows: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    onLoadMoreFlows: PropTypes.func.isRequired,
  },
  mixins: [MasonryMixin('masonryContainer', masonryOptions)],

  render() {
    const { canLoad, flows, loading, onLoadMoreFlows } = this.props;
    const entryList = flows.map((item) => {
      return (
        <FlowBrick
          flow={item.flow}
          key={item.flow.id}
          relationship={item.relationship}
        />
      );
    });

    return (
      <div className="bricks-wrapper">
        <InfiniteScroll
          canLoad={canLoad}
          loading={loading}
          onLoad={onLoadMoreFlows}
        >
          <section className="bricks" ref="masonryContainer">
            {entryList}
          </section>
        </InfiniteScroll>
      </div>
    );
  },
});

export default Bricks;
