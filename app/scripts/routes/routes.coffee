Routes =
  ## TODO Это не path, это url!
  logout_path: -> TastySettings.host + '/logout'

  tlog_favorite_entries_path: (slug) -> '/@' + slug + '/favorites'
  tag_path: (tag) -> '/tags/' + tag

  friends_feed_path: -> '/friends/'
  live_feed_path:    -> '/live/'
  people_path:       -> '/people/'

window.Routes = window.Routes || Routes