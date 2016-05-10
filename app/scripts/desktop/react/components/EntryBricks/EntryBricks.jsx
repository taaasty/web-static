import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import setQuery from 'set-query-string';
import WaypointService from '../../services/CustomWaypointService';
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
    const { canLoad, children, entries, host_tlog_id, loading, onLoadMoreEntries } = this.props;

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
            {entries.map((item) =>
               <EntryBrick
                 entry={item.entry}
                 host_tlog_id={host_tlog_id}
                 key={item.entry.id}
                 moderation={item.moderation}
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
  entries: PropTypes.array.isRequired,
  host_tlog_id: PropTypes.number,
  loading: PropTypes.bool.isRequired,
  onLoadMoreEntries: PropTypes.func.isRequired,
};

export default EntryBricks;
