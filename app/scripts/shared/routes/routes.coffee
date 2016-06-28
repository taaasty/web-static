Routes =
  locale: () ->
    # Необходим только для i18next, возвращаем маску урла
    { localesPath, localesVersion } = gon

    vParam = if localesVersion? then '?v=' + localesVersion else ''
    "#{localesPath}/{{lng}}.json#{vParam}"

  ## TODO Это не path, это url!
  logout_path: -> '/logout'

  tlog_favorite_entries_path: (slug) -> '/~' + slug + '/favorites'

  friends_feed_path:                  -> '/friends'
  flows_path: (filter) -> if filter then "/flows?flows_filter=#{filter}" else '/flows'
  live_feed_path:                     -> '/live'
  live_anonymous_feed_path:           -> '/live/anonymous'
  live_flows_feed_path:                -> '/live/flows'
  best_feed_path:                     -> '/best'
  anonymous_feed_path:                -> '/anonymous'
  people_path:                        -> '/people'
  new_entry_url:     (userSlug, type) -> "/~#{userSlug}/new#{if type then "##{type}" else ""}"
  new_anonymous_entry_url: (userSlug) -> '/~' + userSlug + '/anonymous/new'
  my_tlog_url:             (userSlug) -> '/~' + userSlug
  favorites_url:           (userSlug) -> '/~' + userSlug + '/favorites'
  private_entries_url:     (userSlug) -> '/~' + userSlug + '/privates'
  entry_edit_url: (userSlug, entryId) -> '/~' + userSlug + '/edit' + '/' + entryId
  messagesUrl:             (userSlug) -> '/~' + userSlug + '/conversations'
  notificationsUrl:        (userSlug) -> '/~' + userSlug + '/notifications'

  userProfile: (userSlug) -> '/~' + userSlug + '/profile'
  userSettings: (userSlug) -> '/~' + userSlug + '/settings'
  userDesignSettings: (userSlug) -> '/~' + userSlug + '/design_settings'
  userTag: (userSlug, tag) -> '/~' + userSlug + '/tags/' + tag

  tlogPagination:   (userSlug, type='tlog', page=1) ->
    pageParam = if page == 1 then '' else "?page=#{page}"
    typeFragment = switch (type)
      when 'tlog', 'flow' then ''
      when 'private' then 'privates'
      when 'favorite' then 'favorites'
    "/~#{userSlug}/#{typeFragment}#{pageParam}"

  daylogPagination: (userSlug, page) -> '/~' + userSlug + '/' + page

  orders: (orderId) ->
    if orderId
      "/orders/#{orderId}"
    else
      "/orders"

  newOrder: (_entryID, _type) ->
    entryID = window.encodeURIComponent(_entryID);
    type = window.encodeURIComponent(_type);
    "/orders/new?entry_id=#{entryID}&type=#{type}"
  newFlowOrder: (_flowId, _type) ->
    flowId = window.encodeURIComponent(_flowId);
    type = window.encodeURIComponent(_type);
    "/orders/new?flow_id=#{flowId}&type=#{type}"
  flows: -> '/flows'
  editEntry: (userTag, entryID) -> '/' + userTag + '/edit/' + entryID
  contacts: -> '/contacts'
  terms: -> '/terms'
  prices: -> '/prices'
  policy: -> '/policy'

module.exports = Routes
