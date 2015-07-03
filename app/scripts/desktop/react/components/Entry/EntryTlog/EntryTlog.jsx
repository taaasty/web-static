import React, { Component, PropTypes } from 'react';
import EntryActionCreators from '../../../actions/Entry';
import EntryTlogContent from './EntryTlogContent';

const ENTRY_TYPES = [
  'text', 'image', 'video', 'quote', 'link', 'song', 'code'
];

export default class EntryTlog extends Component {
  static propTypes = {
    entry: PropTypes.object.isRequired,
    commentator: PropTypes.object,
    moderation: PropTypes.object
  }
  state = {
    entry: this.props.entry,
    hasModeration: !!this.props.moderation
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.hasModeration !== nextState.hasModeration;
  }
  render() {
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
      <article data-id={this.props.entry.id}
               data-time={this.props.entry.created_at}
               className={this.getEntryClasses()}>
        <EntryTlogContent
            {...actions}
            entry={this.props.entry}
            commentator={this.props.commentator}
            hasModeration={this.state.hasModeration} />
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
    TastyConfirmController.show({
      message: i18n.t('delete_entry_confirm'),
      acceptButtonText: i18n.t('delete_entry_button'),
      onAccept: () => {
        EntryActionCreators.delete(this.props.entry.id);
      }
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