Routes =
  locale: ->
    # Необходим только для i18next, возвращаем маску урла
    { localesPath, localesVersion } = gon

    vParam = if localesVersion? then '?v=' + localesVersion else ''
    localesPath + '/__lng__.json' + vParam

  ## TODO Это не path, это url!
  logout_path: -> '/logout'

  tlog_favorite_entries_path: (slug) -> '/~' + slug + '/favorites'
  tag_path: (tag) -> '/tags/' + tag

  friends_feed_path:                  -> '/friends'
  live_feed_path:                     -> '/live'
  best_feed_path:                     -> '/best'
  anonymous_feed_path:                -> '/anonymous'
  people_path:                        -> '/people'
  new_entry_url:           (userSlug) -> '/~' + userSlug + '/new'
  new_anonymous_entry_url: (userSlug) -> '/~' + userSlug + '/anonymous/new'
  my_tlog_url:             (userSlug) -> '/~' + userSlug
  favorites_url:           (userSlug) -> '/~' + userSlug + '/favorites'
  private_entries_url:     (userSlug) -> '/~' + userSlug + '/privates'
  entry_edit_url: (userSlug, entryId) -> '/~' + userSlug + '/edit' + '/' + entryId
  messagesUrl:             (userSlug) -> '/~' + userSlug + '/conversations'
  notificationsUrl:        (userSlug) -> '/~' + userSlug + '/notifications'

  userProfile:        (userSlug) -> '/~' + userSlug + '/profile'
  userSettings:       (userSlug) -> '/~' + userSlug + '/settings'
  userDesignSettings: (userSlug) -> '/~' + userSlug + '/design_settings'

  tlogPagination:   (userSlug, page) -> '/~' + userSlug + '/page/' + page
  daylogPagination: (userSlug, page) -> '/~' + userSlug + '/' + page

  orders: -> '/orders'

module.exports = Routes