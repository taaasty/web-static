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

      for item in value.items
        if item.id == relationship.id || item.reader_id == relationship.reader_id
          return true

    false

  updateSummary: (summary) ->
    for relationship, value of _relationships
      value.totalCount = summary[relationship + '_count']

  unshiftRelationships: (type, relationships) ->
    unless _relationships[type]
      return console.warn 'Unknown type of relationship', type

    _relationships[type].items ||= []
    newRelationships = _relationships[type].items.slice(0)

    for relationship in relationships
      unless @isRelationshipExists relationship
        newRelationships.unshift relationship

    _relationships[type].items = newRelationships

  pushRelationships: (type, relationships) ->
    unless _relationships[type]
      return console.warn 'Unknown type of relationship', type

    _relationships[type].items ||= []
    newRelationships = _relationships[type].items.slice(0)

    for relationship in relationships
      unless @isRelationshipExists relationship
        newRelationships.push relationship

    _relationships[type].items = newRelationships

  approveRequest: (relationship) ->
    relationships = _relationships['requested'].items

    @_removeRelationship 'requested', relationship if @isRelationshipExists relationship
    @unshiftRelationships 'followers', [relationship]

  disapproveRequest: (relationship) ->
    @_removeRelationship 'requested', relationship if @isRelationshipExists relationship

  unfollowFromYourself: (relationship) ->
    @_removeRelationship 'followers', relationship if @isRelationshipExists relationship

  _removeRelationship: (type, relationship) ->
    newRelationships           = _relationships[type].items.slice(0)
    newRelationshipsTotalCount = _relationships[type].totalCount

    for rel, i in newRelationships
      if rel.id == relationship.id               ||
         rel.reader_id == relationship.user_id   ||
         rel.reader_id == relationship.reader_id
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
      _relationships[action.relationship].items = []
      RelationshipsStore.pushRelationships action.relationship, action.items
      RelationshipsStore.emitChange()
      break
    when 'moreRelationshipsLoaded'
      RelationshipsStore.pushRelationships action.relationship, action.items
      RelationshipsStore.emitChange()
      break
    when 'requestedRelationshipApproved'
      RelationshipsStore.approveRequest action.relationship
      RelationshipsStore.emitSummaryChange()
      RelationshipsStore.emitChange()
      break
    when 'requestedRelationshipDisapproved'
      RelationshipsStore.disapproveRequest action.relationship
      RelationshipsStore.emitSummaryChange()
      RelationshipsStore.emitChange()
      break
    when 'relationshipUnfollowedFromYourself'
      RelationshipsStore.unfollowFromYourself action.relationship
      RelationshipsStore.emitSummaryChange()
      RelationshipsStore.emitChange()
      break