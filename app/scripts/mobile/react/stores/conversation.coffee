assign        = require 'react/lib/Object.assign'
BaseStore     = require './_base'
Constants     = require '../constants/constants'
AppDispatcher = require '../dispatcher/dispatcher'

_conversations = {}

ConversationStore = assign new BaseStore(),

  initialize: (conversations) ->
    _conversations = conversations

  getAll: ->
    _conversations

module.exports = ConversationStore