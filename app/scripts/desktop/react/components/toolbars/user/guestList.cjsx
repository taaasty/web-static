UserToolbarListItem = require './list/item'

UserToolbarGuestList = React.createClass
  displayName: 'UserToolbarGuestList'

  render: ->
    <ul className="toolbar__nav">
      <UserToolbarListItem
          title={ i18n.t('feed_live') }
          icon="icon--wave"
          href={ Routes.live_feed_path() } />
      <UserToolbarListItem
          title={ i18n.t('feed_best') }
          icon="icon--rating"
          href={ Routes.best_feed_path() } />
      <UserToolbarListItem
          title={ i18n.t('feed_anonymous') }
          icon="icon--anonymous"
          href={ Routes.anonymous_feed_path() } />
    </ul>

module.exports = UserToolbarGuestList