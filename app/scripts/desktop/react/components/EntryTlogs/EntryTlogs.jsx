/*global $ */
import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import EntryTlog from '../EntryTlog';
import WaypointService from '../../services/CustomWaypointService';
import InfiniteScroll from '../common/InfiniteScroll';

class EntryTlogs extends Component {
  componentDidMount() {
    if (!this.props.isFeed) {
      this.waypointService = WaypointService('.post', { cb: this.onWaypointTrigger.bind(this) });
      this.waypointService.attach();
      this.waypointRefresh = _.debounce(this.waypointService.refresh, 100);
      $(document).on('domChanged', this.waypointRefresh);
    }
  }
  componentWillUnmount() {
    if (this.waypointService) {
      this.waypointService.detach();
      $(document).off('domChanged', this.waypointRefresh);
    }
  }
  onWaypointTrigger(data) {
    $(document).trigger('waypoint.trigger', data); //trigger calendar
  }
  render() {
    const { canLoad, entries, hostTlogId, loading, onDelete, onLoadMoreEntries } = this.props;

    return (
      <InfiniteScroll
        canLoad={canLoad}
        loading={loading}
        onLoad={onLoadMoreEntries}
      >
        <section className="posts">
          {entries.map((entryId) => (
             <EntryTlog
               entryId={entryId}
               hostTlogId={hostTlogId}
               isFormHidden={entries.length > 1}
               isInList
               key={`entry-tlog-${entryId}`}
               onDelete={onDelete}
             />))
          }
        </section>
      </InfiniteScroll>
    );
  }
}

EntryTlogs.propTypes = {
  canLoad: PropTypes.bool.isRequired,
  entries: PropTypes.array.isRequired,
  hostTlogId: PropTypes.number,
  isFeed: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onLoadMoreEntries: PropTypes.func.isRequired,
};

export default EntryTlogs;
