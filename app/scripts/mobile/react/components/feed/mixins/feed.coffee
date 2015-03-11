FeedStore = require '../../../stores/feed'

LOAD_MORE_ENTRIES_LIMIT = 10
SHOW_STATE    = 'show'
LOADING_STATE = 'load'
ERROR_STATE   = 'error'

FeedMixin =

  getDefaultProps: ->
    limit: LOAD_MORE_ENTRIES_LIMIT

  getInitialState: ->
    currentState: SHOW_STATE

  isLoadingState: -> @state.currentState is LOADING_STATE

  activateShowState:    -> @safeUpdateState(currentState: SHOW_STATE)
  activateLoadingState: -> @safeUpdateState(currentState: LOADING_STATE)
  activateErrorState:   -> @safeUpdateState(currentState: ERROR_STATE)

  getStateFromStore: ->
    entries:          FeedStore.getEntries()
    everythingLoaded: FeedStore.isEverythingLoaded()

module.exports = FeedMixin