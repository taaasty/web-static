/*global i18n */
import React, { Component, PropTypes } from 'react';
import { Map } from 'immutable';
import Helmet from 'react-helmet';
import uri from 'urijs';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { getTlogEntry } from '../../actions/TlogEntryActions';
import { deleteEntry } from '../../actions/TlogEntriesActions';
import { SM_TLOG_ENTRY, sendCategory } from '../../../../shared/react/services/Sociomantic';
import { TLOG_SLUG_ANONYMOUS } from '../../../../shared/constants/Tlog';

import EntryTlog from '../EntryTlog';
import PinPostButton from './PinPostButton';
import Spinner from '../../../../shared/react/components/common/Spinner';

const emptyEntry = Map();
const emptyTlog = Map();
const emptyEntryAuthor = Map();

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
  shouldComponentUpdate(nextProps) {
    const { entry, entryAuthor, tlog } = this.props;

    return (
      !Object.is(tlog, nextProps.tlog) ||
      !Object.is(entry, nextProps.entry) ||
      !Object.is(entryAuthor, nextProps.entryAuthor)
    );
  }
  handleDeleteEntry(id) {
    this.props.deleteEntry(id);
    browserHistory.goBack();
  }
  title(entry, author) {
    return (
      entry.get('titleTruncated') ||
      entry.get('textTruncated') ||
      author.get('tag', '')
    );
  }
  renderFlowEntry() {
    const { entry, entryAuthor, entryId, tlog } = this.props;
    const bgStyle = { opacity: tlog.getIn([ 'design', 'feedOpacity' ], '1.0') };

    return (
      <div className="page-body">
        <Helmet title={this.title(entry, entryAuthor)} />
        <div className="layout-outer">
          <div className="content-area">
            <div className="content-area__bg" style={bgStyle} />
            <div className="content-area__inner">
              <div>
                <EntryTlog
                  entryId={entryId}
                  hostTlogId={tlog.get('id')}
                  isFetching={!tlog.get('id') || !entry.get('id')}
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
    const { currentUserId, entry, entryAuthor, entryId, tlog } = this.props;
    const bgStyle = { opacity: tlog.getIn([ 'design', 'feedOpacity' ], '1.0') };
    const showPinButton = (
      currentUserId &&
      currentUserId === entryAuthor.get('id') &&
      !entry.get('isPrivate')
    );

    return (
      <div className="page-body">
        <Helmet title={this.title(entry, entryAuthor)} />
        <div className="content-area">
          <div className="content-area__bg" style={bgStyle} />
          <div className="content-area__inner">
             {showPinButton &&
              <PinPostButton
                entryId={entry.get('id')}
                orderId={entry.get('fixedOrderId')}
                status={entry.get('fixedState')}
                till={entry.get('fixedUpAt')}
              />
            }
            <div>
              <EntryTlog
                entryId={entryId}
                hostTlogId={tlog.get('id')}
                isFetching={!entry.get('id')}
                onDelete={this.handleDeleteEntry.bind(this)}
              />
            </div>
            <nav className="pagination">
              {!tlog.get('tlogUrl')
               ? <Spinner size={24} />
               : <Link className="pagination__item" to={uri(tlog.get('tlogUrl')).path()}>
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
    return this.props.tlog.get('isFlow') ? this.renderFlowEntry() : this.renderTlogEntry();
  }
}

EntryPageContainer.propTypes = {
  currentUserId: PropTypes.number,
  deleteEntry: PropTypes.func.isRequired,
  entry: PropTypes.object.isRequired,
  entryAuthor: PropTypes.object.isRequired,
  entryId: PropTypes.number.isRequired,
  getTlogEntry: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  tlog: PropTypes.object.isRequired,
};


export default connect(
  (state, ownProps) => {
    const { currentUser, entities } = state;
    const { 
      params: { 
        slug, 
        anonymousEntrySlug,
      }, 
      location: { 
        state: locationState,
      },
      route: {
        initEntryId,
      },
    } = ownProps;
    const entryId = locationState && locationState.id || initEntryId;
    const entry = entities.getIn([ 'entry', String(entryId) ], emptyEntry);
    const tSlug = slug || (anonymousEntrySlug && TLOG_SLUG_ANONYMOUS);

    return {
      entry,
      entryId,
      entryAuthor: entities.getIn([ 'tlog', String(entry.get('author')) ], emptyEntryAuthor),
      currentUserId: currentUser.data.id,
      tlog: entities.get('tlog').find((t) => t.get('slug') === tSlug, null, emptyTlog),
    };
  },
  { deleteEntry, getTlogEntry }
)(EntryPageContainer);
