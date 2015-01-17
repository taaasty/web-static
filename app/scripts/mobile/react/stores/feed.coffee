assign        = require 'react/lib/Object.assign'
BaseStore     = require './_base'
Constants     = require '../constants/constants'
AppDispatcher = require '../dispatcher/dispatcher'

_entries         = []
_everythingLoaded = false

initializeFeed = (entries) ->
  _entries          = entries
  _everythingLoaded = false

pushEntries = (entries) ->
  _entries = _entries.concat entries

window.FeedStore = assign new BaseStore(),

  getEntries: ->
    # This condition needed to return null when we try get value with initial data
    # By default _entries is empty array, and when Feed component will try to get
    # entries from store, he will get null, therefore it will use entries from props
    if _entries.length then _entries else null

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