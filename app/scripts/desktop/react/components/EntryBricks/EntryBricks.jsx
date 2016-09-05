import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import EntryBrick from '../EntryBrick';
import InfiniteScroll from '../common/InfiniteScroll';
import Masonry from 'react-masonry-component';

const masonryOptions = {
  itemSelector: '.brick',
  transitionDuration: 0,
  isFitWidth: true,
  gutter: 20,
  stamp: '.navs-line',
};

class EntryBricks extends Component {
  componentDidMount() {
    this.onResize = _.debounce(this.restamp.bind(this), 100);
    window.addEventListener('resize', this.onResize, false);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize, false);
  }
  restamp() {
    this.forceUpdate();
  }
  render() {
    const {
      canLoad,
      children,
      entries,
      hostTlogId,
      loading,
      onLoadMoreEntries,
    } = this.props;

    return (
      <div className="bricks-wrapper">
        <InfiniteScroll
          canLoad={canLoad}
          loading={loading}
          onLoad={onLoadMoreEntries}
        >
          <Masonry
            className="bricks"
            elementType="section"
            options={masonryOptions}
            ref={(c) => {if (c) { this.masonry = c.masonry; }}}
          >
            {children}
            {entries.map((entryId) =>
               <EntryBrick
                 entryId={entryId}
                 hostTlogId={hostTlogId}
                 key={`brick-item-${entryId}`}
               />)
            }
          </Masonry>
        </InfiniteScroll>
      </div>
    );
  }
}

EntryBricks.propTypes = {
  canLoad: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  entries: PropTypes.array.isRequired,
  hostTlogId: PropTypes.number,
  loading: PropTypes.bool.isRequired,
  onLoadMoreEntries: PropTypes.func.isRequired,
};

export default EntryBricks;
