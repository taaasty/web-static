UserToolbarListItem        = require './list/item'
UserToolbarListSubList     = require './list/subList'
UserToolbarListSubListItem = require './list/subList/item'
{ PropTypes } = React

UserToolbarList = React.createClass

  propTypes:
    user:                      PropTypes.object.isRequired
    unreadConversationsCount:  PropTypes.number.isRequired
    unreadNotificationsCount:  PropTypes.number.isRequired
    onMessagesItemClick:       PropTypes.func.isRequired
    onNotificationsItemClick:  PropTypes.func.isRequired
    onFriendsItemClick:        PropTypes.func.isRequired
    onDesignSettingsItemClick: PropTypes.func.isRequired

  render: ->
    <ul className="toolbar__nav">
      <UserToolbarListItem
          title={ i18n.t('toolbar_new_entry_item') }
          icon="icon--plus"
          href={ Routes.new_entry_url(@props.user.slug) } />
      <UserToolbarListItem
          title={ i18n.t('feed_friends') }
          icon="icon--friends"
          href={ Routes.friends_feed_path() }>
        <UserToolbarListSubList>
          <UserToolbarListSubListItem
              title={ i18n.t('feed_live') }
              icon="icon--wave"
              href={ Routes.live_feed_path() } />
          <UserToolbarListSubListItem
              title={ i18n.t('feed_best') }
              icon="icon--rating"
              href={ Routes.best_feed_path() } />
          <UserToolbarListSubListItem
              title={ i18n.t('feed_anonymous') }
              icon="icon--anonymous"
              href={ Routes.anonymous_feed_path() } />
        </UserToolbarListSubList>
      </UserToolbarListItem>
      <UserToolbarListItem
          title={ i18n.t('toolbar_messages_item') }
          badgeCount={ @props.unreadConversationsCount }
          badgeClassName="messages-badge"
          icon="icon--messages"
          onClick={ @props.onMessagesItemClick } />
      <UserToolbarListItem
          title={ i18n.t('toolbar_notifications_item') }
          badgeCount={ @props.unreadNotificationsCount }
          badgeClassName="notifications-badge"
          icon="icon--bell"
          onClick={ @props.onNotificationsItemClick } />
      <UserToolbarListItem
          title={ i18n.t('toolbar_favorites_item') }
          icon="icon--star"
          href={ Routes.favorites_url(@props.user.slug) } />
      <UserToolbarListItem
          title={ i18n.t('toolbar_privates_item') }
          icon="icon--lock"
          href={ Routes.private_entries_url(@props.user.slug) } />
      <UserToolbarListItem
          title={ i18n.t('toolbar_friends_item') }
          icon="icon--friends"
          onClick={ @props.onFriendsItemClick } />
      <UserToolbarListItem
          title={ i18n.t('toolbar_design_item') }
          icon="icon--drawing"
          href={ Routes.userDesignSettings(@props.user.slug) }
          onClick={ @props.onDesignSettingsItemClick } />
    </ul>

module.exports = UserToolbarList