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
          title="Новая запись"
          icon="icon--plus"
          href={ Routes.new_entry_url(@props.user.slug) } />
      <UserToolbarListItem
          title="Подписки"
          icon="icon--friends"
          href={ Routes.friends_feed_path() }>
        <UserToolbarListSubList>
          <UserToolbarListSubListItem
              title="Прямой эфир"
              icon="icon--wave"
              href={ Routes.live_feed_path() } />
          <UserToolbarListSubListItem
              title="Лучшее"
              icon="icon--rating"
              href={ Routes.best_feed_path() } />
          <UserToolbarListSubListItem
              title="Анонимки"
              icon="icon--anonymous"
              href={ Routes.anonymous_feed_path() } />
        </UserToolbarListSubList>
      </UserToolbarListItem>
      <UserToolbarListItem
          title="Сообщения"
          badgeCount={ @props.unreadConversationsCount }
          badgeClassName="messages-badge"
          icon="icon--messages"
          onClick={ @props.onMessagesItemClick } />
      <UserToolbarListItem
          title="Уведомления"
          badgeCount={ @props.unreadNotificationsCount }
          badgeClassName="notifications-badge"
          icon="icon--bell"
          onClick={ @props.onNotificationsItemClick } />
      <UserToolbarListItem
          title="Избранное"
          icon="icon--star"
          href={ Routes.favorites_url(@props.user.slug) } />
      <UserToolbarListItem
          title="Скрытые записи"
          icon="icon--lock"
          href={ Routes.private_entries_url(@props.user.slug) } />
      <UserToolbarListItem
          title="Управление подписками"
          icon="icon--friends"
          onClick={ @props.onFriendsItemClick } />
      <UserToolbarListItem
          title="Дизайн дневника"
          icon="icon--drawing"
          href={ Routes.userDesignSettings(@props.user.slug) }
          onClick={ @props.onDesignSettingsItemClick } />
    </ul>

module.exports = UserToolbarList