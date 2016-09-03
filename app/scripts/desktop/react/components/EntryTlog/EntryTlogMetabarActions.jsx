/*global i18n */
import React, { Component, PropTypes } from 'react';
import DropdownActions from '../common/DropdownActions';
import DropdownAction from '../common/DropdownAction';
import DropdownActionSPA from '../common/DropdownActionSPA';
import EntryTlogMetabarPin from './EntryTlogMetabarPin';

class EntryTlogMetabarActions extends Component {
  canPin() {
    const {
      commentator,
      entry,
      entryAuthor,
    } = this.props;

    return (
      commentator &&
      !entryAuthor.isEmpty() &&
      commentator.id === entryAuthor.get('id') &&
      !entry.get('isPrivate')
    );
  }
  render() {
    const {
      entry,
      permissions,
    } = this.props;
    const id = entry.get('id');
    const url = entry.get('url', entry.get('entryUrl'));
    const editUrl = entry.get('editUrl');
    const canDelete = permissions.get('canDelete', false);
    const canEdit = permissions.get('canEdit', false);
    const canFavorite = permissions.get('canFavorite', false);
    const canWatch = permissions.get('canWatch', false);
    const isFavorited = permissions.get('isFavorited', false);
    const isWatching = permissions.get('isWatching', false);
    const canReport = permissions.get('canReport', false);

    return (
      <DropdownActions>
        {canEdit && editUrl && (
          <DropdownActionSPA
            icon="icon--pencil"
            title={i18n.t('edit_entry_item')}
            url={editUrl}
          />
        )}
        <DropdownActionSPA
          icon="icon--hyperlink"
          state={{ id }}
          title={i18n.t('link_entry_item')}
          url={url}
        />
        {this.canPin() && (
          <EntryTlogMetabarPin entry={this.props.entry} />
        )}
        {canFavorite && (
          <EntryTlogMetabarFavorite {...this.props}
            isFavorited={isFavorited}
          />
        )}
        {canWatch && (
          <EntryTlogMetabarWatch {...this.props}
            isWatching={isWatching}
          />
        )}
        {canReport && (
          <EntryTlogMetabarReport {...this.props} />
        )}
        {canDelete && (
          <EntryTlogMetabarDelete {...this.props} />
        )}
      </DropdownActions>
    );
  }
}

EntryTlogMetabarActions.propTypes = {
  commentator: PropTypes.object.isRequired,
  entry: PropTypes.object.isRequired,
  entryAuthor: PropTypes.object.isRequired,
  permissions: PropTypes.object.isRequired,
};

class EntryTlogMetabarFavorite extends Component {
  static propTypes = {
    isFavorited: PropTypes.bool,
    onAddToFavorites: PropTypes.func.isRequired,
    onRemoveFromFavorites: PropTypes.func.isRequired,
  };
  handleClick() {
    return this.props.isFavorited ? this.props.onRemoveFromFavorites : this.props.onAddToFavorites;
  }
  render() {
    let icon, title, hoverTitle;

    if (this.props.isFavorited) {
      icon = ['icon--star', 'icon--star-fill'];
      title = i18n.t('entry_in_favorites');
      hoverTitle = i18n.t('remove_from_favorites_entry_item');
    } else {
      icon = ['icon--star'];
      title = i18n.t('add_to_favorites_entry_item');
    }

    return (
      <DropdownAction
        hoverTitle={hoverTitle}
        icon={icon}
        onClick={this.handleClick()}
        title={title}
      />
    );
  }
}

class EntryTlogMetabarWatch extends Component {
  static propTypes = {
    isWatching: PropTypes.bool,
    onAddToWatching: PropTypes.func.isRequired,
    onRemoveFromWatching: PropTypes.func.isRequired,
  };
  handleClick() {
    return this.props.isWatching ? this.props.onRemoveFromWatching : this.props.onAddToWatching;
  }
  render() {
    let title, hoverTitle;

    if (this.props.isWatching) {
      title = i18n.t('watching_entry_item');
      hoverTitle = i18n.t('stop_watch_entry_item');
    } else {
      title = i18n.t('start_watch_entry_item');
    }

    return (
      <DropdownAction
        hoverTitle={hoverTitle}
        icon="icon--comments-subscribe"
        onClick={this.handleClick()}
        title={title}
      />
    );
  }
}

class EntryTlogMetabarReport extends Component {
  static propTypes = {
    onReport: PropTypes.func.isRequired,
  };
  render() {
    return (
      <DropdownAction
        icon="icon--exclamation-mark"
        onClick={this.props.onReport}
        title={i18n.t('report_entry_item')}
      />
    );
  }
}

class EntryTlogMetabarDelete extends Component {
  static propTypes = {
    onDelete: PropTypes.func.isRequired,
  };
  render() {

    return (
      <DropdownAction
        icon="icon--basket"
        onClick={this.props.onDelete}
        title={i18n.t('delete_entry_item')}
      />
    );
  }
}

export default EntryTlogMetabarActions;
