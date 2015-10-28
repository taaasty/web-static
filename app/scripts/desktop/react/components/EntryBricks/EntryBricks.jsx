import _ from 'lodash';
import React, { PropTypes } from 'react';
import setQuery from 'set-query-string';
import WaypointService from '../../services/CustomWaypointService';
import EntryBrick from '../Entry/EntryBrick/EntryBrick';
import InfiniteScroll from '../common/infiniteScroll/index';
import MasonryMixin from 'react-masonry-mixin';

const masonryOptions = {
  itemSelector: '.brick',
  transitionDuration: 0,
  isFitWidth: true,
  gutter: 20,
  stamp: '.navs-line',
};

let EntryBricks = React.createClass({
  mixins: [MasonryMixin('masonryContainer', masonryOptions)],

  propTypes: {
    canLoad: PropTypes.bool.isRequired,
    entries: PropTypes.array.isRequired,
    host_tlog_id: PropTypes.number,
    loading: PropTypes.bool.isRequired,
    onLoadMoreEntries: PropTypes.func.isRequired,
  },

  componentDidMount() {
    if (this.masonry) {
      this.waypointService = WaypointService('.brick', { cb: this.onWaypointTrigger.bind(this) });
      this.waypointService.attach();
      this.waypointRefresh = _.debounce(this.waypointService.refresh, 100);
      this.masonry.on('layoutComplete', _.debounce(this.waypointService.refresh, 100));
    }
    this.onResize = _.debounce(this.restamp, 100);
    window.addEventListener('resize', this.onResize, false);
  },

  componentWillUnmount() {
    if (this.masonry && this.waypointService) {
      this.waypointService.detach();
      this.masonry.off('layoutComplete');
    }
    window.removeEventListener('resize', this.onRsize, false);
  },

  restamp() {
    this.forceUpdate();
  },

  onWaypointTrigger(data) {
    setQuery({ since_entry_id: data.id });
  },

  render() {
    const { canLoad, children, entries, host_tlog_id, loading, onLoadMoreEntries } = this.props;

    return (
      <div className="bricks-wrapper">
        <InfiniteScroll
          canLoad={canLoad}
          loading={loading}
          onLoad={onLoadMoreEntries}
        >
          <section className="bricks" ref="masonryContainer">
            {children}
            {entries.map((item) =>
               <EntryBrick
                 entry={item.entry}
                 host_tlog_id={host_tlog_id}
                 key={item.entry.id}
                 moderation={item.moderation}
               />)
            }
          </section>
        </InfiniteScroll>
      </div>
    );
  }
});

export default EntryBricks;
