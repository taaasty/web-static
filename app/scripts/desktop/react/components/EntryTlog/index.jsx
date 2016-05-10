/*global i18n */
import React, { Component, PropTypes } from 'react';
import EntryActionCreators from '../../actions/Entry';
import EntryTlogContent from './EntryTlogContent';
import EntryTlogPrivate from './EntryTlogPrivate';
import EntryTlogError from './EntryTlogError';
import Spinner from '../../../../shared/react/components/common/Spinner';
import TastyConfirmController from '../../controllers/TastyConfirmController';

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
  state = {
    entry: this.props.entry,
    hasModeration: !!this.props.moderation,
  };
  componentWillReceiveProps(nextProps) {
    if (this.props.entry !== nextProps.entry) {
      this.setState({
        entry: nextProps.entry,
        moderation: !!nextProps.moderation,
      });
    }
  }
  addToFavorites() {
    EntryActionCreators.addToFavorites(this.props.entry.id)
      .then(() => {
        this.setState({ entry: { ...this.state.entry, isFavorited: true }});
      });
  }
  removeFromFavorites() {
    EntryActionCreators.removeFromFavorites(this.props.entry.id)
      .then(() => {
        this.setState({ entry: { ...this.state.entry, isFavorited: false }});
      });
  }
  addToWatching() {
    EntryActionCreators.addToWatching(this.props.entry.id)
      .then(() => {
        this.setState({ entry: { ...this.state.entry, isWatching: true }});
      });
  }
  removeFromWatching() {
    EntryActionCreators.removeFromWatching(this.props.entry.id)
      .then(() => {
        this.setState({ entry: { ...this.state.entry, isWatching: false }});
      });
  }
  report() {
    TastyConfirmController.show({
      message: i18n.t('report_entry_confirm'),
      acceptButtonText: i18n.t('report_entry_button'),
      onAccept: () => {
        EntryActionCreators.report(this.props.entry.id);
      },
    });
  }
  delete() {
    const {
      entry: { id: entryID },
      hostTlogId: tlogID,
      onDelete,
      successDeleteUrl,
    } = this.props;

    TastyConfirmController.show({
      message: i18n.t('delete_entry_confirm'),
      acceptButtonText: i18n.t('delete_entry_button'),
      onAccept: () => {
        EntryActionCreators.delete(entryID, tlogID)
          .then(() => {
            // onDelete у нас есть только если пост рендерят из контейнера
            // тогда отдаем удаление контейнеру, иначе редиректим куда указано
            if (typeof onDelete === 'function') {
              onDelete(entryID);
            } else if (successDeleteUrl) {
              window.setTimeout(() => window.location.href = successDeleteUrl, 0);
            }
          });
      },
    });
  }
  accept() {
    EntryActionCreators.accept(this.props.moderation.accept_url)
      .then(() => {
        let { accept_action } = this.props.moderation;

        switch(accept_action) {
          case 'delete':
            this.props.onDelete(this.props.entry.id);
            break;
          case 'nothing':
            this.setState({hasModeration: false});
            break;
        }
      });
  }
  decline() {
    EntryActionCreators.decline(this.props.moderation.decline_url)
      .then(() => {
        let { decline_action } = this.props.moderation;

        switch(decline_action) {
          case 'delete':
            this.props.onDelete(this.props.entry.id);
            break;
          case 'nothing':
            this.setState({hasModeration: false});
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
  }
  render() {
    const { commentator: _commentator, error, hostTlogId,
            isFetching, isFormHidden, isInList } = this.props;
    const commentator = (_commentator && _commentator.id) ? _commentator : anonCommentator;
    const { entry, hasModeration } = this.state;

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
               hasModeration={hasModeration}
               hostTlogId={hostTlogId}
               isFormHidden={isFormHidden}
               isInList={isInList}
               onAccept={this.accept.bind(this)}
               onAddToFavorites={this.addToFavorites.bind(this)}
               onAddToWatching={this.addToWatching.bind(this)}
               onDecline={this.decline.bind(this)}
               onDelete={this.delete.bind(this)}
               onRemoveFromFavorites={this.removeFromFavorites.bind(this)}
               onRemoveFromWatching={this.removeFromWatching.bind(this)}
               onReport={this.report.bind(this)}
             />}
        </article>;
  }
}

EntryTlog.propTypes = {
  commentator: PropTypes.object,
  entry: PropTypes.object.isRequired,
  error: PropTypes.object,
  hostTlogId: PropTypes.number,
  isFetching: PropTypes.bool,
  isFormHidden: PropTypes.bool,
  isInList: PropTypes.bool,
  moderation: PropTypes.object,
  onDelete: PropTypes.func,
  successDeleteUrl: PropTypes.string,
};

export default EntryTlog;
