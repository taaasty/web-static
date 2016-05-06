/*global i18n */
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import uri from 'urijs';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { getTlogEntry } from '../../actions/TlogEntryActions';
import { deleteEntry } from '../../actions/TlogEntriesActions';
import { SM_TLOG_ENTRY, sendCategory } from '../../../../shared/react/services/Sociomantic';
import { getTlog } from '../TlogPage';

import EntryTlog from '../EntryTlog';
import PinPostButton from './PinPostButton';
import Spinner from '../../../../shared/react/components/common/Spinner';

class EntryPageContainer extends Component {
  componentWillMount() {
    const { location: { state }, tlogEntry: { id }, getTlogEntry } = this.props;

    (state && getTlogEntry(state.id, state.refetch));
    if (id) {
      sendCategory(SM_TLOG_ENTRY, id);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { getTlogEntry, tlogEntry: { id } } = this.props;
    const { location: { state }, tlogEntry: { id: nextId } } = nextProps;

    (state && getTlogEntry(state.id));
    if (nextId && id !== nextId) {
      sendCategory(SM_TLOG_ENTRY, nextId);
    }
  }
  handleDeleteEntry(id) {
    this.props.deleteEntry(id);
    browserHistory.goBack();
  }
  title(entry) {
    return entry.title_truncated ||
           entry.text_truncated ||
           (entry.author && entry.author.tag);
  }
  renderFlowEntry() {
    const { commentator, tlog, tlogEntry } = this.props;
    const bgStyle = { opacity: tlog.design ? tlog.design.feedOpacity : '1.0' };

    return (
      <div className="page-body">
        <Helmet title={this.title(tlogEntry)} />
        <div className="layout-outer">
          <div className="content-area">
            <div className="content-area__bg" style={bgStyle} />
            <div className="content-area__inner">
              <div>
                <EntryTlog
                  commentator={commentator}
                  entry={tlogEntry}
                  error={tlogEntry.error}
                  hostTlogId={tlog.id}
                  isFetching={!tlog.id || !tlogEntry.id}
                  onDelete={this.handleDeleteEntry.bind(this)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  renderTlogEntry() {
    const { commentator, currentUserId, tlog, tlogEntry } = this.props;
    const bgStyle = { opacity: tlog.design ? tlog.design.feedOpacity : '1.0' };

    return (
      <div className="page-body">
        <Helmet title={this.title(tlogEntry)} />
        <div className="content-area">
          <div className="content-area__bg" style={bgStyle} />
          <div className="content-area__inner">
             {currentUserId && tlogEntry.author &&
              currentUserId === tlogEntry.author.id && !tlogEntry.isPrivate &&
             <PinPostButton
               entryId={tlogEntry.id}
               orderId={tlogEntry.fixedOrderId}
               status={tlogEntry.fixedState}
               till={tlogEntry.fixedUpAt}
             />
            }
            <div>
              <EntryTlog
                commentator={commentator}
                entry={tlogEntry}
                error={null}
                hostTlogId={tlog.id}
                isFetching={!tlog.id || !tlogEntry.id}
                onDelete={this.handleDeleteEntry.bind(this)}
              />
            </div>
            <nav className="pagination">
              {!tlog.id || !tlog.tlogUrl
               ? <Spinner size={24} />
               : <Link className="pagination__item" to={uri(tlog.tlogUrl).path()}>
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
    return this.props.tlog.isFlow ? this.renderFlowEntry() : this.renderTlogEntry();
  }
}

EntryPageContainer.propTypes = {
  commentator: PropTypes.object.isRequired,
  currentUserId: PropTypes.number,
  deleteEntry: PropTypes.func.isRequired,
  getTlogEntry: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  tlog: PropTypes.object.isRequired,
  tlogEntry: PropTypes.object.isRequired,
};


//      data: { ...data, url: data.url || data.entry_url },   //FIXME inconsistent data /entries|/tlogs

export default connect(
  (state, ownProps) => {
    const { currentUser, entities: { comment, tlog, entryCollItem, entry } } = state;
    const { params: { slug }, location: { state: locationState } } = ownProps;
    const entryColl = entryCollItem[locationState.id];
    const commentator = entryColl && entryColl.commentator
            ? tlog[entryColl.commentator]
            : currentUser.data;
    const tlogEntry = entry[locationState.id];

    return {
      commentator,
      currentUserId: currentUser.data.id,
      tlog: getTlog(tlog, slug),
      tlogEntry: (tlogEntry && Object.assign({}, tlogEntry, {
        url: tlogEntry.url || tlogEntry.entryUrl,
        author: tlog[tlogEntry.author],
        tlog: tlog[tlogEntry.tlog],
        commentator: tlog[tlogEntry.tlog],
        comments: (tlogEntry.comments || []).map((commentId) => {
          const c = comment[commentId];

          return Object.assign({}, c, { user: tlog[c.user] });
        }),
      })) || {},
    };
  },
  { deleteEntry, getTlogEntry }
)(EntryPageContainer);
