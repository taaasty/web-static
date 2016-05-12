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
    const { location: { state }, getTlogEntry } = this.props;

    if (state && state.id) {
      getTlogEntry(state.id, state.refetch);
      sendCategory(SM_TLOG_ENTRY, state.id);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { location: { state }, getTlogEntry } = this.props;
    const { location: { state: nextState } } = nextProps;

    if (state && nextState && state.id !== nextState.id) {
      getTlogEntry(nextState.id);
      sendCategory(SM_TLOG_ENTRY, nextState.id);
    }
  }
  handleDeleteEntry(id) {
    this.props.deleteEntry(id);
    browserHistory.goBack();
  }
  title(entry) {
    return entry.titleTruncated || entry.textTruncated || (entry.author && entry.author.tag);
  }
  renderFlowEntry() {
    const { tlog, tlogEntry } = this.props;
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
                  entryId={tlogEntry.id}
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
    const { currentUserId, tlog, tlogEntry } = this.props;
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
                entryId={tlogEntry.id}
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
  currentUserId: PropTypes.number,
  deleteEntry: PropTypes.func.isRequired,
  getTlogEntry: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  tlog: PropTypes.object.isRequired,
  tlogEntry: PropTypes.object.isRequired,
};


export default connect(
  (state, ownProps) => {
    const { currentUser, entities: { tlog, entry } } = state;
    const { params: { slug }, location: { state: locationState } } = ownProps;
    const tlogEntry = entry[locationState && locationState.id];

    return {
      currentUserId: currentUser.data.id,
      tlog: getTlog(tlog, slug),
      tlogEntry: (tlogEntry && Object.assign({}, tlogEntry, { author: tlog[tlogEntry.author] })) || {},
    };
  },
  { deleteEntry, getTlogEntry }
)(EntryPageContainer);
