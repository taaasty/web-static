/*global i18n, TastyConfirmController, DOMManipulationsMixin */
import React, { Component, PropTypes } from 'react';
import EntryActionCreators from '../../../actions/Entry';
import EntryTlogContent from './EntryTlogContent';

const ENTRY_TYPES = [
  'text', 'image', 'video', 'quote', 'link', 'song', 'code'
];

export default class EntryTlog extends Component {
  static propTypes = {
    commentator: PropTypes.object,
    entry: PropTypes.object.isRequired,
    host_tlog_id: PropTypes.number,
    moderation: PropTypes.object,
    onDelete: PropTypes.func,
    successDeleteUrl: PropTypes.string,
  }
  state = {
    entry: this.props.entry,
    hasModeration: !!this.props.moderation
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.hasModeration !== nextState.hasModeration;
  }
  render() {
    const { commentator, entry, host_tlog_id } = this.props;

    let actions = {
      onAddToFavorites: ::this.addToFavorites,
      onRemoveFromFavorites: ::this.removeFromFavorites,
      onAddToWatching: ::this.addToWatching,
      onRemoveFromWatching: ::this.removeFromWatching,
      onReport: ::this.report,
      onDelete: ::this.delete,
      onAccept: ::this.accept,
      onDecline: ::this.decline
    };

    return (
      <article
        data-id={entry.id}
        data-time={entry.created_at}
        className={this.getEntryClasses()}
      >
        <EntryTlogContent
          {...actions}
          entry={entry}
          commentator={commentator}
          hasModeration={this.state.hasModeration}
          host_tlog_id={host_tlog_id}
        />
      </article>
    );
  }
  addToFavorites() {
    EntryActionCreators.addToFavorites(this.props.entry.id)
      .then(() => {
        this.state.entry.is_favorited = true;
        this.forceUpdate();
      });
  }
  removeFromFavorites() {
    EntryActionCreators.removeFromFavorites(this.props.entry.id)
      .then(() => {
        this.state.entry.is_favorited = false;
        this.forceUpdate();
      });
  }
  addToWatching() {
    EntryActionCreators.addToWatching(this.props.entry.id)
      .then(() => {
        this.state.entry.is_watching = true;
        this.forceUpdate();
      });
  }
  removeFromWatching() {
    EntryActionCreators.removeFromWatching(this.props.entry.id)
      .then(() => {
        this.state.entry.is_watching = false;
        this.forceUpdate();
      });
  }
  report() {
    TastyConfirmController.show({
      message: i18n.t('report_entry_confirm'),
      acceptButtonText: i18n.t('report_entry_button'),
      onAccept: () => {
        EntryActionCreators.report(this.props.entry.id);
      }
    });
  }
  delete() {
    const {
      entry: { id: entryID },
      host_tlog_id: tlogID,
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
}
