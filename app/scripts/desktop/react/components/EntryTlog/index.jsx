/*global i18n */
/*eslint react/jsx-sort-prop-types: 0 */
import React, { Component, PropTypes } from 'react';
import { Map } from 'immutable';
import EntryTlogContent from './EntryTlogContent';
import EntryTlogPrivate from './EntryTlogPrivate';
import EntryTlogError from './EntryTlogError';
import Spinner from '../../../../shared/react/components/common/Spinner';
import TastyConfirmController from '../../controllers/TastyConfirmController';
import NoticeService from '../../services/Notice';
import { connect } from 'react-redux';
import {
  favoriteEntry,
  unfavoriteEntry,
  watchEntry,
  unwatchEntry,
  reportEntry,
  deleteEntry,
  repostEntry,
  acceptEntry,
  declineEntry,
} from '../../actions/EntryActions';
import {
  BY_ENTRIES_LIMIT,
  getTlogEntriesCommentsIfNeeded,
} from '../../actions/CommentsActions';
import {
  getTlogEntriesPermissionsIfNeeded,
  getTlogEntriesRatingsIfNeeded,
} from '../../actions/TlogEntriesActions';
import { onlyUpdateForKeys } from 'recompose';

import {
  ENTRY_TYPES,
  ENTRY_TYPE_ANONYMOUS,
} from '../../constants/EntryConstants';
import {
  ERROR_PRIVATE_ENTRY,
} from '../../../../shared/constants/ErrorConstants';

const emptyState = {};
const emptyEntry = Map();
const emptyAuthor = Map();
const emptyTlog = Map();
const emptyPermissions = Map();

const anonCommentator = {
  userpic: {
    defaultColors: {
      background: '#42d792',
      name: '#ffffff',
    },
    kind: 'user',
    symbol: '?',
  },
};

class EntryTlog extends Component {
  componentWillMount() {
    this.fetchNeededData(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.fetchNeededData(nextProps);
  }
  fetchNeededData(props) {
    const {
      entry,
      shouldFetchComments,
      shouldFetchPermissions,
      shouldFetchRating,
      getTlogEntriesCommentsIfNeeded,
      getTlogEntriesPermissionsIfNeeded,
      getTlogEntriesRatingsIfNeeded,
    } = props;

    if (entry.get('id')) {
      const entries = Map({ [entry.get('id')]: entry });

      if (shouldFetchComments) {
        getTlogEntriesCommentsIfNeeded(entries);
      }

      if (shouldFetchPermissions) {
        getTlogEntriesPermissionsIfNeeded(entries);
      }

      if (shouldFetchRating) {
        getTlogEntriesRatingsIfNeeded(entries);
      }
    }
  }
  favoriteEntry() {
    return this.props.favoriteEntry(this.props.entryId)
      .then((data) => {
        if (window.ga) {
          window.ga('send', 'event', 'UX', 'AddToFavorite');
        }
        return data;
      });
  }
  unfavoriteEntry() {
    return this.props.unfavoriteEntry(this.props.entryId);
  }
  watchEntry() {
    return this.props.watchEntry(this.props.entryId);
  }
  unwatchEntry() {
    return this.props.unwatchEntry(this.props.entryId);
  }
  reportEntry() {
    TastyConfirmController.show({
      message: i18n.t('report_entry_confirm'),
      acceptButtonText: i18n.t('report_entry_button'),
      onAccept: () => {
        this.props.reportEntry(this.props.entryId)
          .then(() => NoticeService.notifySuccess(i18n.t('report_entry_success')));
      },
    });
  }
  deleteEntry() {
    const {
      deleteEntry,
      entryId,
      hostTlogId,
      onDelete,
    } = this.props;

    TastyConfirmController.show({
      message: i18n.t('delete_entry_confirm'),
      acceptButtonText: i18n.t('delete_entry_button'),
      onAccept: () => {
        deleteEntry(entryId, hostTlogId)
          .then(() => {
            NoticeService.notifySuccess(i18n.t('delete_entry_success'));
            onDelete(entryId);
          });
      },
    });
  }
  acceptEntry() {
    const {
      acceptEntry,
      entryId,
      moderation: {
        acceptUrl,
        acceptAction,
      },
      onDelete,
    } = this.props;

    return acceptEntry(acceptUrl)
      .then(() => {
        NoticeService.notifySuccess(i18n.t('messages.entry_accept_success'));

        switch(acceptAction) {
          case 'delete':
            onDelete(entryId);
            break;
          case 'nothing':
            //this.setState({hasModeration: false});
            break;
        }
      });
  }
  declineEntry() {
    const {
      declineEntry,
      entryId,
      moderation: {
        declineAction,
        declineUrl,
      },
      onDelete,
    } = this.props;

    declineEntry(declineUrl)
      .then(() => {
        NoticeService.notifySuccess(i18n.t('messages.entry_decline_success'));

        switch(declineAction) {
          case 'delete':
            onDelete(entryId);
            break;
          case 'nothing':
            //this.setState({hasModeration: false});
            break;
        }
      });
  }
  getEntryClasses() {
    const type = this.props.entry.get('type');
    let typeClass = ENTRY_TYPES.indexOf(type) != -1 ? type : 'text';

    return `post post--${typeClass}`;
  }
  renderError() {
    const {
      error,
      errorCode,
      responseCode,
    } = this.props.entryState.error;

    if (errorCode === ERROR_PRIVATE_ENTRY) {
      return <EntryTlogPrivate />;
    } else if (responseCode === 404) {
      return <EntryTlogError error={error} />;
    }

    return null;
  }
  render() {
    const {
      commentator,
      entry,
      entryAuthor,
      entryState,
      entryTlog,
      entryTlogAuthor,
      hostTlogId,
      isFetching,
      isFormHidden,
      isInList,
      moderation,
      permissions,
    } = this.props;
    const error = entryState && entryState.error;
    const entryType = entry.get('type');

    return !error && (isFetching || !entryType)
      ? (
        <article className="post post--loading">
          <Spinner size={30} />
        </article>
      )
      : (
        <article
          className={this.getEntryClasses()}
          data-id={entry.get('id')}
          data-time={entry.get('createdAt')}
        >
          {error
            ? this.renderError()
            : (
              <EntryTlogContent
                commentator={commentator}
                entry={entry}
                entryAuthor={entryAuthor}
                entryState={entryState}
                entryTlog={entryTlog}
                entryTlogAuthor={entryTlogAuthor}
                hasModeration={!!moderation}
                hostTlogId={hostTlogId}
                isFormHidden={isFormHidden}
                isInList={isInList}
                onAccept={this.acceptEntry.bind(this)}
                onAddToFavorites={this.favoriteEntry.bind(this)}
                onAddToWatching={this.watchEntry.bind(this)}
                onDecline={this.declineEntry.bind(this)}
                onDelete={this.deleteEntry.bind(this)}
                onRemoveFromFavorites={this.unfavoriteEntry.bind(this)}
                onRemoveFromWatching={this.unwatchEntry.bind(this)}
                onReport={this.reportEntry.bind(this)}
                permissions={permissions}
              />
          )}
        </article>
      );
  }
}

EntryTlog.propTypes = {
  // ownProps
  entryId: PropTypes.number,
  error: PropTypes.object,
  hostTlogId: PropTypes.number,
  isFetching: PropTypes.bool,
  isFormHidden: PropTypes.bool,
  isInList: PropTypes.bool,
  onDelete: PropTypes.func,

  // added by connect wrapper
  entry: PropTypes.object.isRequired,
  entryAuthor: PropTypes.object.isRequired,
  entryTlog: PropTypes.object.isRequired,
  entryTlogAuthor: PropTypes.object.isRequired,
  entryState: PropTypes.object,
  commentator: PropTypes.object,
  moderation: PropTypes.object,
  permissions: PropTypes.object.isRequired,

  acceptEntry: PropTypes.func.isRequired,
  declineEntry: PropTypes.func.isRequired,
  deleteEntry: PropTypes.func.isRequired,
  favoriteEntry: PropTypes.func.isRequired,
  reportEntry: PropTypes.func.isRequired,
  repostEntry: PropTypes.func.isRequired,
  unfavoriteEntry: PropTypes.func.isRequired,
  unwatchEntry: PropTypes.func.isRequired,
  watchEntry: PropTypes.func.isRequired,

  shouldFetchComments: PropTypes.bool.isRequired,
  shouldFetchPermissions: PropTypes.bool.isRequired,
  shouldFetchRating: PropTypes.bool.isRequired,
  getTlogEntriesCommentsIfNeeded: PropTypes.func.isRequired,
  getTlogEntriesPermissionsIfNeeded: PropTypes.func.isRequired,
  getTlogEntriesRatingsIfNeeded: PropTypes.func.isRequired,
};

export default connect(
  (state, ownProps) => {
    const { entryId } = ownProps;
    const {
      currentUser,
      entities,
      entryState,
      ratingState,
    } = state;
    const entry = entities.getIn([ 'entry', String(entryId) ], emptyEntry);
    const entryAuthor = entities.getIn([ 'tlog', String(entry.get('author')) ], emptyAuthor);
    const entryTlog = entities.getIn([ 'tlog', String(entry.get('tlog')) ], emptyTlog);
    const commentator = entities.getIn(
      [ 'tlog', String(entities.getIn([ 'entryCollItem', String(entryId), 'commentator' ])) ],
      currentUser.data.id ? currentUser.data : anonCommentator);
    const moderation = null; // TODO: implement when premod enabled
    const shouldFetchComments = (
      entities
        .get('comment')
        .filter((c) => c.get('entryId') === entryId)
        .count() < Math.min(BY_ENTRIES_LIMIT, entry.get('commentsCount')) &&
      !(entryState[entryId] && entryState[entryId].isFetchingComments)
    );
    const shouldFetchRating = (
      entry.get('type') !== ENTRY_TYPE_ANONYMOUS &&
      !entities.getIn(['rating', String(entryId)]) &&
      !ratingState.getIn([entryId, 'isFetching'])
    );
    const permissions = entities.getIn(['permission', String(entryId)], emptyPermissions);
    const shouldFetchPermissions = (
      permissions.isEmpty() &&
      !(entryState[entryId] && entryState[entryId].isFetchingPermissions)
    );

    return {
      commentator: typeof commentator.toJS === 'function' ? commentator.toJS() : commentator,
      entry,
      entryAuthor,
      entryTlog,
      entryTlogAuthor: entities.getIn([ 'tlog', String(entryTlog.get('author')) ], emptyAuthor),
      entryState: entryState[entry.get('id')] || emptyState,
      moderation,
      permissions,
      shouldFetchComments,
      shouldFetchPermissions,
      shouldFetchRating,
    };
  },
  {
    favoriteEntry,
    unfavoriteEntry,
    watchEntry,
    unwatchEntry,
    reportEntry,
    deleteEntry,
    repostEntry,
    acceptEntry,
    declineEntry,
    getTlogEntriesCommentsIfNeeded,
    getTlogEntriesPermissionsIfNeeded,
    getTlogEntriesRatingsIfNeeded,
  }
)(onlyUpdateForKeys([
  'entryId',
  'error',
  'hostTlogId',
  'isFetching',
  'isFormHidden',
  'isInList',
  'entry',
  'entryAuthor',
  'entryTlog',
  'entryTlogAuthor',
  'entryState',
  'commentator',
  'moderation',
  'permissions',
  'shouldFetchComments',
  'shouldFetchPermissions',
  'shouldFetchRating',
])(EntryTlog));
