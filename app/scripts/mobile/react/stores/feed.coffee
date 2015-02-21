assign        = require 'react/lib/Object.assign'
BaseStore     = require './_base'
Constants     = require '../constants/constants'
AppDispatcher = require '../dispatcher/dispatcher'

_entries          = []
_everythingLoaded = false

initializeFeed = (entries) ->
  _entries          = entries
  _everythingLoaded = false

pushEntries = (entries) ->
  _entries = _entries.concat entries

FeedStore = assign new BaseStore(),

  getEntries: -> _entries

  isEverythingLoaded: -> _everythingLoaded

module.exports = FeedStore

FeedStore.dispatchToken = AppDispatcher.register (payload) ->
  action = payload.action

  switch action.type
    when Constants.feed.INITIALIZE_FEED
      initializeFeed action.entries
      FeedStore.emitChange()

    when Constants.feed.LOAD_ENTRIES
      if action.entries.length
        pushEntries action.entries
      else
        _everythingLoaded = true
      FeedStore.emitChange()