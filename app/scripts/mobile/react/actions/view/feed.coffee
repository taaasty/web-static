Api               = require '../../api/api'
NotifyController  = require '../../controllers/notify'
FeedServerActions = require '../server/feed'

FeedViewActions =

  initializeFeed: (entries) ->
    FeedServerActions.initializeFeed entries

  loadLiveEntries: (sinceEntryId, limit) ->
    Api.feed.loadLiveEntries sinceEntryId, limit
      .then (response) =>
        FeedServerActions.loadEntries response.entries
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  loadBestEntries: (sinceEntryId, limit) ->
    Api.feed.loadBestEntries sinceEntryId, limit
      .then (response) =>
        FeedServerActions.loadEntries response.entries
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  loadFriendsEntries: (sinceEntryId, limit) ->
    Api.feed.loadFriendsEntries sinceEntryId, limit
      .then (response) =>
        FeedServerActions.loadEntries response.entries
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  loadTlogEntriesTlogs: (tlogId, sinceEntryId, limit) ->
    Api.tlog.loadEntriesTlogs(tlogId, sinceEntryId, limit)
      .then((response) ->
        FeedServerActions.loadEntries response.items )
      .fail((xhr) ->
        NotifyController.errorResponse xhr )

module.exports = FeedViewActions
