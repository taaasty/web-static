CHANGE_EVENT         = 'changed'
SUMMARY_CHANGE_EVENT = 'summary:changed'

relationships = {
  followings: {
    items:      null
    totalCount: null
  }
  followers: {
    items:      null
    totalCount: null
  }
  guesses: {
    items:      null
    totalCount: null
  }
  requests: {
    items:      null
    totalCount: null
  }
  ignored: {
    items:      null
    totalCount: null
  }
}

window.RelationshipsStore = _.extend {}, EventEmitter.prototype, {

  emitChange:                -> @emit CHANGE_EVENT
  addChangeListener:    (cb) -> @on  CHANGE_EVENT, cb
  removeChangeListener: (cb) -> @off CHANGE_EVENT, cb
  emitSummaryChange:                -> @emit SUMMARY_CHANGE_EVENT
  addSummaryChangeListener:    (cb) -> @on  SUMMARY_CHANGE_EVENT, cb
  removeSummaryChangeListener: (cb) -> @off SUMMARY_CHANGE_EVENT, cb

  getRelationships:        -> relationships
  getFollowers:            -> relationships.followers.items
  getFollowings:           -> relationships.followings.items
  getGuesses:              -> relationships.guesses.items
  getIgnored:              -> relationships.ignored.items
  getRequests:             -> relationships.requests.items

  getFollowersTotalCount:  -> relationships.followers.totalCount
  getFollowingsTotalCount: -> relationships.followings.totalCount
  getGuessesTotalCount:    -> relationships.guesses.totalCount
  getIgnoredTotalCount:    -> relationships.ignored.totalCount
  getRequestsTotalCount:   -> relationships.requests.totalCount

  isSummaryLoaded: ->
    for relationship, value of relationships when value.totalCount is null
      return false

    true

  updateSummary: (summary) ->
    for relationship, value of relationships
      value.totalCount = summary[relationship + '_count']
}

RelationshipsStore.dispatchToken = RelationshipsDispatcher.register (payload) ->
  action = payload.action

  switch action.type
    when 'summaryLoaded'
      RelationshipsStore.updateSummary action.summary
      RelationshipsStore.emitSummaryChange()
      break