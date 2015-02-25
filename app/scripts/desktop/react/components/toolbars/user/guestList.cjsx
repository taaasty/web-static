UserToolbarListItem = require './list/item'

UserToolbarGuestList = React.createClass
  displayName: 'UserToolbarGuestList'

  render: ->
    <ul className="toolbar__nav">
      <UserToolbarListItem
          title="Подписки"
          icon="icon--friends"
          href={ Routes.friends_feed_path() } />
      <UserToolbarListItem
          title="Прямой эфир"
          icon="icon--wave"
          href={ Routes.live_feed_path() } />
      <UserToolbarListItem
          title="Лучшее"
          icon="icon--rating"
          href={ Routes.best_feed_path() } />
      <UserToolbarListItem
          title="Анонимки"
          icon="icon--anonymous"
          href={ Routes.anonymous_feed_path() } />
    </ul>

module.exports = UserToolbarGuestList