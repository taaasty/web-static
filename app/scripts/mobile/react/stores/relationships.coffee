_             = require 'underscore'
BaseStore     = require './_base'
Constants     = require '../constants/constants'
AppDispatcher = require '../dispatcher/dispatcher'

_relationships = {}

updateStatus = ({userId, status}) ->
  _relationships[userId] = status

RelationshipsStore = _.extend new BaseStore(),

  getStatus: (userId) ->
    _relationships[userId]

module.exports = RelationshipsStore

RelationshipsStore.dispatchToken = AppDispatcher.register (payload) ->
  action = payload.action

  switch action.type
    when Constants.relationship.UPDATE_RELATIONSHIP
      {userId, relationship} = action

      updateStatus
        userId: userId
        status: relationship.state

      RelationshipsStore.emitChange()