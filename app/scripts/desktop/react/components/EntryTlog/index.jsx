/*global i18n */
import React, { Component, PropTypes } from 'react';
import EntryTlogContent from './EntryTlogContent';
import EntryTlogPrivate from './EntryTlogPrivate';
import EntryTlogError from './EntryTlogError';
import Spinner from '../../../../shared/react/components/common/Spinner';
import TastyConfirmController from '../../controllers/TastyConfirmController';
import NoticeService from '../../services/Notice';
import { connect } from 'react-redux';
import {
  voteEntry,
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

import { ENTRY_TYPES } from '../../constants/EntryConstants';
import { ERROR_PRIVATE_ENTRY } from '../../../../shared/constants/ErrorConstants';

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
  shouldComponentUpdate(nextProps) {
    const {
      entryId,
      error,
      hostTlogId,
      isFetching,
      isFormHidden,
      isInList,
      entry,
      entryAuthor,
      entryTlog,
      entryTlogAuthor,
      entryState,
      commentator,
      moderation,
    } = this.props;
    const {
      entryId: nextEntryId,
      error: nextError,
      hostTlogId: nextHostTlogId,
      isFetching: nextIsFetching,
      isFormHidden: nextIsFormHidden,
      isInList: nextIsInList,
      entry: nextEntry,
      entryAuthor: nextEntryAuthor,
      entryTlog: nextEntryTlog,
      entryTlogAuthor: nextEntryTlogAuthor,
      entryState: nextEntryState,
      commentator: nextCommentator,
      moderation: nextModeration,
    } = nextProps;

    return entryId !== nextEntryId ||
      error !== nextError ||
      hostTlogId !== nextHostTlogId ||
      isFetching !== nextIsFetching ||
      isFormHidden !== nextIsFormHidden ||
      isInList !== nextIsInList ||
      entry !== nextEntry ||
      entryAuthor !== nextEntryAuthor ||
      entryTlog !== nextEntryTlog ||
      entryTlogAuthor !== nextEntryTlogAuthor ||
      entryState !== nextEntryState ||
      commentator !== nextCommentator ||
      moderation !== nextModeration;
  }
  voteEntry() {
    return this.props.voteEntry(this.props.entryId)
      .then((data) => {
        if (window.ga) {
          window.ga('send', 'event', 'UX', 'Like');
        }
        return data;
      });
    // TODO: restore PostAuth logic
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
    const { deleteEntry, entryId, hostTlogId, onDelete } = this.props;

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
    const { acceptEntry, entryId, moderation: { acceptUrl, acceptAction },
            onDelete} = this.props;

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
    const { declineEntry, entryId, moderation: { declineAction, declineUrl },
            onDelete } = this.props;

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
    let { type } = this.props.entry;
    let typeClass = ENTRY_TYPES.indexOf(type) != -1 ? type : 'text';

    return `post post--${typeClass}`;
  }
  renderError() {
    const { error, error_code, response_code } = this.props.error;

    if (error_code === ERROR_PRIVATE_ENTRY) {
      return <EntryTlogPrivate />;
    } else if (response_code === 404) {
      return <EntryTlogError error={error} />;
    } 

    return null;
  }
  render() {
    const { commentator, entry: rawEntry, entryAuthor, entryTlog, entryTlogAuthor, error,
            hostTlogId, isFetching, isFormHidden, isInList, moderation } = this.props;
    const entry = Object.assign({}, rawEntry, {
      url: rawEntry.url || rawEntry.entryUrl,
      author: entryAuthor,
      tlog: Object.assign({}, entryTlog, { author: entryTlogAuthor }),
    });

    console.count('entryTlog');

    return !error && (isFetching || !entry.type)
      ? <article className="post post--loading">
          <Spinner size={30} />
        </article>
      : <article
          className={this.getEntryClasses()}
          data-id={entry.id}
          data-time={entry.createdAt}
        >
          {error
           ? this.renderError()
           : <EntryTlogContent
               commentator={commentator}
               entry={entry}
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
               onVote={this.voteEntry.bind(this)}
             />}
        </article>;
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
  entryState: PropTypes.object.isRequired,
  commentator: PropTypes.object,
  moderation: PropTypes.object,

  acceptEntry: PropTypes.func.isRequired,
  declineEntry: PropTypes.func.isRequired,
  deleteEntry: PropTypes.func.isRequired,
  favoriteEntry: PropTypes.func.isRequired,
  reportEntry: PropTypes.func.isRequired,
  repostEntry: PropTypes.func.isRequired,
  unfavoriteEntry: PropTypes.func.isRequired,
  unwatchEntry: PropTypes.func.isRequired,
  voteEntry: PropTypes.func.isRequired,
  watchEntry: PropTypes.func.isRequired,
};

export default connect(
  (state, ownProps) => {
    const { entryId } = ownProps;
    const { currentUser, entities, entryState } = state;
    const { tlog, entry: entryStore, entryCollItem } = entities;
    const entry = entryStore[entryId] || {};
    const entryTlog = tlog[entry.tlog] || {};
    const entryColl = entryCollItem[entryId];
    const commentator = entryColl && entryColl.commentator
            ? tlog[entryColl.commentator]
            : currentUser.data.id
              ? currentUser.data
              : anonCommentator;
    const moderation = null; // TODO: implement when premod enabled

    return Object.assign({}, ownProps, {
      entry,
      entryTlog,
      commentator,
      moderation,
      entryAuthor: tlog[entry.author] || {},
      entryTlogAuthor: entryTlog && tlog[entryTlog.author] || {},
      entryState: entryState[entry.id] || {},
    });
  },
  {
    voteEntry,
    favoriteEntry,
    unfavoriteEntry,
    watchEntry,
    unwatchEntry,
    reportEntry,
    deleteEntry,
    repostEntry,
    acceptEntry,
    declineEntry,
  }
)(EntryTlog);
