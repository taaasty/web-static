/*global i18n */
import React, { Component, PropTypes } from 'react';
import DropdownActions from '../../../../components/common/DropdownActions';
import DropdownAction from '../../../../components/common/DropdownAction';
import ConversationActions from '../../../actions/ConversationActions';

class PublicConversationActions extends Component {
  onClickContainer(ev) {
    ev.stopPropagation();
  }
  onClickFavorite(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    
    const { id, entry: { is_favorited } } = this.props.conversation;

    if (is_favorited) {
      ConversationActions.conversationEntryRemoveFromFavorites(id);
    } else {
      ConversationActions.conversationEntryAddToFavorites(id);
    }
  }
  onClickWatch(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    
    const { id, entry: { is_watching } } = this.props.conversation;

    if (is_watching) {
      ConversationActions.conversationEntryRemoveFromWatching(id);
    } else {
      ConversationActions.conversationEntryAddToWatching(id);
    }
  }
  render() {
    const { can_favorite, can_watch, is_favorited, is_watching } = this.props.conversation.entry;

    if (!can_favorite && !can_watch) {
      return null;
    }

    return (
      <div className="meta-item-container" onClick={this.onClickContainer}>
        <DropdownActions>
          {can_favorite &&
          <DropdownAction
            hoverTitle={is_favorited && i18n.t('remove_from_favorites_entry_item')}
            icon={`icon--star${is_favorited ? ' icon--star-fill' : ''}`}
            key="fav"
            onClick={this.onClickFavorite.bind(this)}
            title={i18n.t(is_favorited ? 'entry_in_favorites' : 'add_to_favorites_entry_item')}
          />}
          {can_watch &&
          <DropdownAction
            hoverTitle={is_watching && i18n.t('stop_watch_entry_item')}
            icon="icon--comments-subscribe"
            key="watch"
            onClick={this.onClickWatch.bind(this)}
            title={i18n.t(is_watching ? 'watching_entry_item' : 'start_watch_entry_item')}
          />}
        </DropdownActions>
      </div>
    );
  }
}

PublicConversationActions.propTypes = {
  conversation: PropTypes.object.isRequired,
};

export default PublicConversationActions;
