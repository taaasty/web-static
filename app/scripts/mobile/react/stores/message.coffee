_                 = require 'lodash'
assign            = require 'react/lib/Object.assign'
BaseStore         = require './_base'
ConversationStore = require './conversation'
CurrentUserStore  = require './currentUser'
Constants         = require '../constants/constants'
AppDispatcher     = require '../dispatcher/dispatcher'

_messages = {}

global.MessageStore = assign new BaseStore(),

  get: (id) ->
    _messages[id]

  getAll: ->
    _messages

  getAllForThread: (conversationID) ->
    convMessages = []

    _.forEach _messages, (item) ->
      convMessages.push(item) if item.conversation_id == conversationID

    convMessages = _.sortBy convMessages, (item) -> item.id

    convMessages

  getAllForCurrentThread: ->
    @getAllForThread ConversationStore.getCurrentID()

  getInfo: (msgID, convID) ->
    conversation = ConversationStore.get convID
    message      = @get msgID
    currentUser  = CurrentUserStore.getUser()
    recipient    = conversation.recipient

    if recipient.id == message.recipient_id
      messageInfo = type: 'outgoing', user: currentUser
    else
      messageInfo = type: 'incoming', user: recipient

    messageInfo

module.exports = MessageStore

MessageStore.dispatchToken = AppDispatcher.register (payload) ->
  action = payload.action

  switch action.type
    when Constants.messenger.LOAD_MESSAGES
      _.forEach action.messages, (item) -> _messages[item.id] = item
      MessageStore.emitChange()