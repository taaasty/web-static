Constants     = require '../../constants/constants'
AppDispatcher = require '../../dispatcher/dispatcher'

FeedServerActions =

  initializeFeed: (entries) ->
    AppDispatcher.handleServerAction
      type: Constants.feed.INITIALIZE_FEED
      entries: entries

  loadEntries: (entries) ->
    AppDispatcher.handleServerAction
      type: Constants.feed.LOAD_ENTRIES
      entries: entries

module.exports = FeedServerActions