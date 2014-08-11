window.Routes =
  logout_path: -> TastySettings.host + '/logout'
  tlog_favorite_entries_path: (slug) -> '/@' + slug + '/favorites'
  tlog_path: (slug) -> '/@' + slug