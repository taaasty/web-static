/*global i18n */
import React, { PropTypes } from 'react';
import DropdownActions from '../../common/DropdownActions';
import DropdownAction from '../../common/DropdownAction';

class EntryTlogMetabarActions {
  render() {
    const { can_delete, can_edit, can_favorite, can_report, can_watch,
            edit_url, is_favorited, is_watching, url } = this.props.entry;
    return (
      <DropdownActions>
        {can_edit &&
         <DropdownAction
           icon="icon--pencil"
           title={i18n.t('edit_entry_item')}
           url={edit_url}
         />}
        <DropdownAction
          icon="icon--hyperlink"
          title={i18n.t('link_entry_item')}
          url={url}
        />
        {can_favorite &&
         <EntryTlogMetabarFavorite {...this.props}
           isFavorited={is_favorited}
         />}
        {can_watch &&
         <EntryTlogMetabarWatch {...this.props}
           isWatching={is_watching}
         />}
        {can_report &&
         <EntryTlogMetabarReport {...this.props} />}
        {can_delete &&
         <EntryTlogMetabarDelete {...this.props} />}
      </DropdownActions>
    );
  }
}

EntryTlogMetabarActions.propTypes = {
  entry: PropTypes.object.isRequired,
};

class EntryTlogMetabarFavorite {
  static propTypes = {
    isFavorited: PropTypes.bool,
    onAddToFavorites: PropTypes.func.isRequired,
    onRemoveFromFavorites: PropTypes.func.isRequired,
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
  handleClick() {
    return this.props.isFavorited ? this.props.onRemoveFromFavorites : this.props.onAddToFavorites;
  }
}

class EntryTlogMetabarWatch {
  static propTypes = {
    isWatching: PropTypes.bool,
    onAddToWatching: PropTypes.func.isRequired,
    onRemoveFromWatching: PropTypes.func.isRequired,
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
  handleClick() {
    return this.props.isWatching ? this.props.onRemoveFromWatching : this.props.onAddToWatching;
  }
}

class EntryTlogMetabarReport {
  static propTypes = {
    onReport: PropTypes.func.isRequired,
  }
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

class EntryTlogMetabarDelete {
  static propTypes = {
    onDelete: PropTypes.func.isRequired,
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
        icon="icon--basket"
        onClick={this.props.onDelete}
        title={i18n.t('delete_entry_item')}
      />
    );
  }
}

export default EntryTlogMetabarActions;
