Routes =
  ## TODO Это не path, это url!
  logout_path: -> TastySettings.host + '/logout'

  tlog_favorite_entries_path: (slug) -> '/@' + slug + '/favorites'
  tag_path: (tag) -> '/tags/' + tag

  friends_feed_path:                  -> TastySettings.host + '/friends'
  live_feed_path:                     -> TastySettings.host + '/live'
  best_feed_path:                     -> TastySettings.host + '/best'
  anonymous_feed_path:                -> TastySettings.host + '/anonymous'
  people_path:                        -> TastySettings.host + '/people'
  new_entry_url:           (userSlug) -> TastySettings.host + '/~' + userSlug + '/new'
  new_anonymous_entry_url: (userSlug) -> TastySettings.host + '/~' + userSlug + '/anonymous/new'
  my_tlog_url:             (userSlug) -> TastySettings.host + '/~' + userSlug
  favorites_url:           (userSlug) -> TastySettings.host + '/~' + userSlug + '/favorites'
  private_entries_url:     (userSlug) -> TastySettings.host + '/~' + userSlug + '/privates'

module.exports = Routes