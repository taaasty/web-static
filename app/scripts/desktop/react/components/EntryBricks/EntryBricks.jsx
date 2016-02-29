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
    if (this.masonry) {
      this.waypointService = WaypointService('.brick', { cb: this.onWaypointTrigger.bind(this) });
      this.waypointService.attach();
      this.masonry.on('layoutComplete', _.debounce(this.waypointService.refresh, 100));
    }
    this.onResize = _.debounce(this.restamp.bind(this), 100);
    window.addEventListener('resize', this.onResize, false);
  }
  componentWillUnmount() {
    if (this.masonry && this.waypointService) {
      this.waypointService.detach();
      this.masonry.off('layoutComplete');
    }
    window.removeEventListener('resize', this.onResize, false);
  }
  restamp() {
    this.forceUpdate();
  }
  onWaypointTrigger(data) {
    setQuery({ since_entry_id: data.id });
  }
  render() {
    const { canLoad, children, entries, host_tlog_id, isFeed, loading, onLoadMoreEntries } = this.props;

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
                 isFeed={isFeed}        
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
  isFeed: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  onLoadMoreEntries: PropTypes.func.isRequired,
};

export default EntryBricks;
