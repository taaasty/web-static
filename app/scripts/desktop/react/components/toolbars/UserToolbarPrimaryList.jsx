/*global i18n */
import React, { PropTypes } from 'react';
import Routes from '../../../../shared/routes/routes';
import UserToolbarListItem from './UserToolbarListItem';
import Avatar from '../../../../shared/react/components/common/Avatar';

class UserToolbarPrimaryList {
  render() {
    const { onDesignSettingsClick, onFriendsClick, onNotificationsClick, onMessagesClick,
            unreadAnonymousCount, unreadBestCount, unreadConversationsCount, unreadFriendsCount,
            unreadLiveCount, unreadLiveFlowCount, unreadNotificationsCount,
            user: { slug, tlog_url, userpic} } = this.props;

    return (
      <ul className="toolbar__nav">
        <UserToolbarListItem
          title={i18n.t('avatar_toolbar_tooltip')}
          url={tlog_url}
        >
          <Avatar size={30} userpic={userpic} />
        </UserToolbarListItem>
        <UserToolbarListItem
          badgeClassName="messages-badge"
          badgeCount={unreadFriendsCount}
          icon="icon--friends"
          title={i18n.t('feed_friends')}
          url={Routes.friends_feed_path()}
        />
        <UserToolbarListItem
          badgeClassName="messages-badge"
          badgeCount={unreadLiveFlowCount}
          icon="icon--hash"
          label="new"
          labelClassName="toolbar__label--new"
          title={i18n.t('toolbar_flows_item')}
          url={Routes.flows()}
        />
        <UserToolbarListItem
          badgeClassName="messages-badge"
          badgeCount={unreadLiveCount}
          icon="icon--wave"
          title={i18n.t('feed_live')}
          url={Routes.live_feed_path()}
        />
        <UserToolbarListItem
          badgeClassName="messages-badge"
          badgeCount={unreadBestCount}
          icon="icon--fire"
          title={i18n.t('feed_best')}
          url={Routes.best_feed_path()}
        />
        <UserToolbarListItem
          icon="icon--people"
          title={i18n.t('feed_people')}
          url={Routes.people_path()}
        />
        <UserToolbarListItem
          badgeClassName="messages-badge"
          badgeCount={unreadAnonymousCount}
          icon="icon--anonymous"
          title={i18n.t('feed_anonymous')}
          url={Routes.anonymous_feed_path()}
        />
        <UserToolbarListItem
          badgeClassName="messages-badge"
          badgeCount={unreadConversationsCount}
          icon="icon--messages"
          onClick={onMessagesClick}
          title={i18n.t('toolbar_messages_item')}
        />
        <UserToolbarListItem
          badgeClassName="notifications-badge"
          badgeCount={unreadNotificationsCount}
          icon="icon--bell"
          onClick={onNotificationsClick}
          title={i18n.t('toolbar_notifications_item')}
        />
        <UserToolbarListItem
          icon="icon--star"
          title={i18n.t('toolbar_favorites_item')}
          url={Routes.favorites_url(slug)}
        />
        <UserToolbarListItem
          icon="icon--lock"
          title={i18n.t('toolbar_privates_item')}
          url={Routes.private_entries_url(slug)}
        />
        <UserToolbarListItem
          icon="icon--friends"
          onClick={onFriendsClick}
          title={i18n.t('toolbar_friends_item')}
        />
        <UserToolbarListItem
          icon="icon--drawing"
          onClick={onDesignSettingsClick}
          title={i18n.t('toolbar_design_item')}
          url={Routes.userDesignSettings(slug)}
        />
      </ul>
    );
  }
}

UserToolbarPrimaryList.propTypes = {
  onDesignSettingsClick: PropTypes.func.isRequired,
  onFriendsClick: PropTypes.func.isRequired,
  onMessagesClick: PropTypes.func.isRequired,
  onNotificationsClick: PropTypes.func.isRequired,
  stayOpen: PropTypes.bool.isRequired,
  unreadAnonymousCount: PropTypes.number.isRequired,
  unreadBestCount: PropTypes.number.isRequired,
  unreadConversationsCount: PropTypes.number.isRequired,
  unreadFriendsCount: PropTypes.number.isRequired,
  unreadLiveCount: PropTypes.number.isRequired,
  unreadLiveFlowCount: PropTypes.number.isRequired,
  unreadNotificationsCount: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
};

export default UserToolbarPrimaryList;
