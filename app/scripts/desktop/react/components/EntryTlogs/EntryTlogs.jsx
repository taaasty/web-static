/*global $ */
import _ from 'lodash';
import React, { PropTypes } from 'react';
import setQuery from 'set-query-string';
import EntryTlog from '../Entry/EntryTlog/EntryTlog';
import WaypointService from '../../services/CustomWaypointService';
import InfiniteScroll from '../common/infiniteScroll/index';

class EntryTlogs {
  componentDidMount() {
    this.waypointService = WaypointService('.post', { cb: this.onWaypointTrigger.bind(this) });
    this.waypointService.attach();
    this.waypointRefresh = _.debounce(this.waypointService.refresh, 100);
    $(document).on('domChanged', this.waypointRefresh);
  }
  componentWillUnmount() {
    if (this.waypointService) {
      this.waypointService.detach();
      $(document).off('domChanged', this.waypointRefresh);
    }
  }
  onWaypointTrigger(data) {
    $(document).trigger('waypoint.trigger', data); //trigger calendar
    setQuery({ since_entry_id: data.id });
  }
  render() {
    const { canLoad, entries, host_tlog_id, loading, onDelete, onLoadMoreEntries } = this.props;

    return (
      <InfiniteScroll
        canLoad={canLoad}
        loading={loading}
        onLoad={onLoadMoreEntries}
      >
        <section className="posts">
          {entries.map((item) => (
             <EntryTlog
               commentator={item.commentator}
               entry={item.entry}
               hideCommentForm={entries.length > 1}
               host_tlog_id={host_tlog_id}
               key={item.entry.id}
               moderation={item.moderation}
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
  host_tlog_id: PropTypes.number,
  loading: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onLoadMoreEntries: PropTypes.func.isRequired,
};

export default EntryTlogs;
