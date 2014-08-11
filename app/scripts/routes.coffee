window.Routes =
  logout_path: -> TastySettings.host + '/logout'
  tlog_favorite_entries_path: (slug) -> '/@' + slug + '/favorites'
  tag_path: (tag) -> '/tags/' + tag