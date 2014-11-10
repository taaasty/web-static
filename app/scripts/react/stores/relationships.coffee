CHANGE_EVENT         = 'changed'
SUMMARY_CHANGE_EVENT = 'summary:changed'

_relationships = {
  followings: {
    items:      null
    totalCount: null
  }
  followers: {
    items:      null
    totalCount: null
  }
  guessed: {
    items:      null
    totalCount: null
  }
  requested: {
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

  getRelationships:        -> _relationships
  getFollowers:            -> _relationships.followers.items
  getFollowings:           -> _relationships.followings.items
  getGuessed:              -> _relationships.guessed.items
  getIgnored:              -> _relationships.ignored.items
  getRequested:            -> _relationships.requested.items

  getFollowersTotalCount:  -> _relationships.followers.totalCount
  getFollowingsTotalCount: -> _relationships.followings.totalCount
  getGuessedTotalCount:    -> _relationships.guessed.totalCount
  getIgnoredTotalCount:    -> _relationships.ignored.totalCount
  getRequestedTotalCount:  -> _relationships.requested.totalCount

  isSummaryLoaded: ->
    for relationship, value of _relationships when value.totalCount is null
      return false

    true

  isRelationshipExists: (relationship) ->
    for rel, value of _relationships
      continue unless value.items?

      for item in value.items when item.id is relationship.id
        return true

    false

  updateSummary: (summary) ->
    for relationship, value of _relationships
      #TODO: Dispose from this workaround, when requestes_count will be renamed to
      # requested_count as our appropriate store key
      relationship = 'requests' if relationship is 'requested'

      value.totalCount = summary[relationship + '_count']

  unshiftRelationships: (type, relationships) ->
    unless _relationships[type]
      return console.warn 'Unknown type of relationship', type

    _relationships[type].items ||= []
    isInitialLoading           = _relationships[type].items.length == 0
    newRelationships           = _relationships[type].items.slice(0)
    newRelationshipsTotalCount = _relationships[type].totalCount

    for relationship in relationships
      unless @isRelationshipExists relationship
        newRelationships.unshift relationship
        newRelationshipsTotalCount++ unless isInitialLoading

    _relationships[type].items      = newRelationships
    _relationships[type].totalCount = newRelationshipsTotalCount

  pushRelationships: (type, relationships) ->
    unless _relationships[type]
      return console.warn 'Unknown type of relationship', type

    _relationships[type].items ||= []
    isInitialLoading           = _relationships[type].items.length == 0
    newRelationships           = _relationships[type].items.slice(0)
    newRelationshipsTotalCount = _relationships[type].totalCount

    for relationship in relationships
      unless @isRelationshipExists relationship
        newRelationships.push relationship
        newRelationshipsTotalCount++ unless isInitialLoading

    _relationships[type].items      = newRelationships
    _relationships[type].totalCount = newRelationshipsTotalCount

  approveRequest: (relationship) ->
    relationships = _relationships['requested'].items

    @_removeRelationship 'requested', relationship if @isRelationshipExists relationship
    @unshiftRelationships 'followers', [relationship]

  unfollowFromYourself: (relationship) ->
    @_removeRelationship 'followers', relationship if @isRelationshipExists relationship

  _removeRelationship: (type, relationship) ->
    newRelationships           = _relationships[type].items.slice(0)
    newRelationshipsTotalCount = _relationships[type].totalCount

    for rel, i in newRelationships
      if rel.id == relationship.id || rel.reader_id == relationship.user_id
        newRelationships.splice i, 1
        newRelationshipsTotalCount--
        break

    _relationships[type].items      = newRelationships
    _relationships[type].totalCount = newRelationshipsTotalCount

}

RelationshipsStore.dispatchToken = RelationshipsDispatcher.register (payload) ->
  action = payload.action

  switch action.type
    when 'summaryLoaded'
      RelationshipsStore.updateSummary action.summary
      RelationshipsStore.emitSummaryChange()
      break
    when 'relationshipsLoaded'
      RelationshipsStore.pushRelationships action.relationship, action.items
      RelationshipsStore.emitChange()
      break
    when 'requestedRelationshipApproved'
      RelationshipsStore.approveRequest action.relationship
      RelationshipsStore.emitSummaryChange()
      RelationshipsStore.emitChange()
      break
    when 'relationshipUnfollowedFromYourself'
      RelationshipsStore.unfollowFromYourself action.relationship
      RelationshipsStore.emitSummaryChange()
      RelationshipsStore.emitChange()
      break