/*global i18n */
import React, { Component, PropTypes } from 'react';
import uri from 'urijs';
import { Link } from 'react-router';

import EntryTlog from '../EntryTlog';
import PinPostButton from './PinPostButton';

class EntryPageContainer extends Component {
  componentWillMount() {
    const { state } = this.props.location;
    state && this.fetchData(state.id);
  }
  componentWillReceiveProps(nextProps) {
    const { params, location: { state } } = nextProps;
    state && this.fetchData(state.id);
  }
  componentWillUnmount() {
    this.props.TlogEntryActions.resetTlogEntry();
  }
  fetchData(newId) {
    const { TlogEntryActions, tlogEntries: { data: { items } },
            tlogEntry } = this.props;

    if (newId && (!tlogEntry.data.id || newId !== tlogEntry.data.id)) {
      const entries = items.filter((item) => item.entry.id === newId);
      const entry = entries[0];

      if (entry) {
        TlogEntryActions.setTlogEntry(entry.entry);
      } else {
        TlogEntryActions.getTlogEntry(newId);
      }
    }
  }
  renderFlowEntry() {
    const { currentUser, currentUserId, error, tlog, tlogEntry } = this.props;
    const bgStyle = { opacity: tlog.data.design.feedOpacity };

    return (
      <div className="page-body">
        <div className="layout-outer">
          <div className="content-area">
            <div className="content-area__bg" style={bgStyle} />
            <div className="content-area__inner">
              <div>
                <EntryTlog
                  commentator={tlogEntry.data.commentator || currentUser.data}
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
    const { currentUser, currentUserId, error, tlog, tlogEntry } = this.props;
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
                commentator={tlogEntry.data.commentator || currentUser.data}
                entry={tlogEntry.data}
                error={tlogEntry.error}
                host_tlog_id={tlog.data.author.id}
                isFetching={tlogEntry.isFetching || tlog.isFetching}
                successDeleteUrl={tlog.data.author && tlog.data.author.tlog_url}
              />
            </div>
            <nav className="pagination">
              <Link className="pagination__item" to={uri(tlog.data.author.tlog_url).path()}>
                {i18n.t('buttons.pagination.tlog_root')}
              </Link>
            </nav>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return this.props.isFlow ? this.renderFlowEntry() : this.renderTlogEntry();
  }
}

EntryPageContainer.propTypes = {
  TlogEntryActions: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  currentUserId: PropTypes.number,
  isFlow: PropTypes.bool,
  location: PropTypes.object.isRequired,
  tlog: PropTypes.object.isRequired,
  tlogEntries: PropTypes.object.isRequired,
  tlogEntry: PropTypes.object.isRequired,
};

export default EntryPageContainer;
