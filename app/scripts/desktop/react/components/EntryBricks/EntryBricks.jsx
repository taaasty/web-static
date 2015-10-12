import React, { PropTypes } from 'react';
import setQuery from 'set-query-string';
import WaypointService from '../../services/WaypointService';
import EntryBrick from '../Entry/EntryBrick/EntryBrick';
import InfiniteScroll from '../common/infiniteScroll/index';
import MasonryMixin from 'react-masonry-mixin';

const masonryOptions = {
  itemSelector: '.brick',
  transitionDuration: 0,
  isFitWidth: true,
  gutter: 20
};

let EntryBricks = React.createClass({
  mixins: [MasonryMixin('masonryContainer', masonryOptions)],

  propTypes: {
    entries: PropTypes.array.isRequired,
    host_tlog_id: PropTypes.number,
    loading: PropTypes.bool.isRequired,
    canLoad: PropTypes.bool.isRequired,
    onLoadMoreEntries: PropTypes.func.isRequired,
  },

  componentDidMount() {
    this.waypointService = WaypointService('.brick', { cb: this.onWaypointTrigger.bind(this) });
  },

  componentWillUnmount() {
    this.waypointService.detach();
  },

  onWaypointTrigger(data) {
    setQuery({ since_entry_id: data.id });
  },

  render() {
    let entryList = this.props.entries.map((item) =>
      <EntryBrick
        entry={item.entry}
        host_tlog_id={this.props.host_tlog_id}
        moderation={item.moderation}
        key={item.entry.id}
      />
    );

    return (
      <div className="bricks-wrapper">
        <InfiniteScroll
            loading={this.props.loading}
            canLoad={this.props.canLoad}
            onLoad={this.props.onLoadMoreEntries}>
          <section ref="masonryContainer" className="bricks">
            {entryList}
          </section>
        </InfiniteScroll>
      </div>
    );
  }
});

export default EntryBricks;
