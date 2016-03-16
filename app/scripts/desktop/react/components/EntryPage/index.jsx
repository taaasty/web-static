/*global i18n */
import React, { Component, PropTypes } from 'react';
import uri from 'urijs';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getTlogEntry, resetTlogEntry, setTlogEntry } from '../../actions/TlogEntryActions';
import { SM_TLOG_ENTRY, sendCategory } from '../../services/Sociomantic';

import EntryTlog from '../EntryTlog';
import PinPostButton from './PinPostButton';
import Spinner from '../../../../shared/react/components/common/Spinner';

class EntryPageContainer extends Component {
  componentWillMount() {
    const { location: { state }, tlogEntry } = this.props;

    state && this.fetchData(state.id, state.isFeed);
    if (tlogEntry.data.id) {
      sendCategory(SM_TLOG_ENTRY, tlogEntry.data.id);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { state } = nextProps.location;
    const { id: nextId } = nextProps.tlogEntry.data;

    state && this.fetchData(state.id, state.isFeed);
    if (nextId && this.props.tlogEntry.data.id !== nextId) {
      sendCategory(SM_TLOG_ENTRY, nextId);
    }
  }
  componentWillUnmount() {
    this.props.resetTlogEntry();
  }
  fetchData(newId, isFeed) {
    const { getTlogEntry, setTlogEntry,
            feedEntries: { items: feedItems },
            tlogEntries: { items: tlogItems },
            tlogEntry } = this.props;

    if (newId && (!tlogEntry.data.id || newId !== tlogEntry.data.id)) {
      const items = isFeed ? feedItems : tlogItems;
      const entries = items.filter((item) => item.entry.id === newId);
      const entry = entries[0];

      if (entry) {
        setTlogEntry(entry.entry);
      } else {
        getTlogEntry(newId);
      }
    }
  }
  renderFlowEntry() {
    const { currentUser, tlog, tlogEntry } = this.props;
    const bgStyle = { opacity: tlog.data.design.feedOpacity };

    return (
      <div className="page-body">
        <div className="layout-outer">
          <div className="content-area">
            <div className="content-area__bg" style={bgStyle} />
            <div className="content-area__inner">
              <div>
                <EntryTlog
                  commentator={tlogEntry.data.commentator || currentUser}
                  entry={tlogEntry.data}
                  error={tlogEntry.error}
                  host_tlog_id={tlog.data.author.id}
                  isFetching={tlogEntry.isFetching || tlog.isFetching}
                  successDeleteUrl={tlog.data.author && tlog.data.author.tlog_url}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  renderTlogEntry() {
    const { currentUser, tlog, tlogEntry } = this.props;
    const currentUserId = currentUser.id;
    const bgStyle = { opacity: tlog.data.design.feedOpacity };

    return (
      <div className="page-body">
        <div className="content-area">
          <div className="content-area__bg" style={bgStyle} />
          <div className="content-area__inner">
             {currentUserId && tlogEntry.data.author &&
              currentUserId === tlogEntry.data.author.id && !tlogEntry.data.is_private &&
             <PinPostButton
               entryId={tlogEntry.data.id}
               orderId={tlogEntry.data.fixed_order_id}
               status={tlogEntry.data.fixed_state}
               till={tlogEntry.data.fixed_up_at}
             />
            }
            <div>
              <EntryTlog
                commentator={tlogEntry.data.commentator || currentUser}
                entry={tlogEntry.data}
                error={tlogEntry.error}
                host_tlog_id={tlog.data.author.id}
                isFetching={tlogEntry.isFetching || tlog.isFetching}
                successDeleteUrl={tlog.data.author && tlog.data.author.tlog_url}
              />
            </div>
            <nav className="pagination">
              {tlog.isFetching || !tlog.data.author.tlog_url
               ? <Spinner size={24} />
               : <Link className="pagination__item" to={uri(tlog.data.author.tlog_url).path()}>
                   {i18n.t('buttons.pagination.tlog_root')}
                 </Link>
              }
            </nav>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return this.props.tlog.data.author.is_flow
      ? this.renderFlowEntry()
      : this.renderTlogEntry();
  }
}

EntryPageContainer.propTypes = {
  currentUser: PropTypes.object.isRequired,
  feedEntries: PropTypes.object.isRequired,
  getTlogEntry: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  resetTlogEntry: PropTypes.func.isRequired,
  setTlogEntry: PropTypes.func.isRequired,
  tlog: PropTypes.object.isRequired,
  tlogEntries: PropTypes.object.isRequired,
  tlogEntry: PropTypes.object.isRequired,
};

export default connect(
  (state) => ({
    currentUser: state.currentUser.data,
    feedEntries: state.feedEntries.data,
    tlog: state.tlog,
    tlogEntries: state.tlogEntries.data,
    tlogEntry: state.tlogEntry,
  }),
  { getTlogEntry, resetTlogEntry, setTlogEntry }
)(EntryPageContainer);
