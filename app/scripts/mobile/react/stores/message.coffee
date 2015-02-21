_                 = require 'lodash'
assign            = require 'react/lib/Object.assign'
BaseStore         = require './_base'
ConversationStore = require './conversation'
CurrentUserStore  = require './currentUser'
Constants         = require '../constants/constants'
AppDispatcher     = require '../dispatcher/dispatcher'

_messages = {}      # Key is message id
_localMessages = {} # Key is message uuid

addLocalMessage = (convID, messageText, uuid) ->
  conversation = ConversationStore.get convID
  currentUser  = CurrentUserStore.getUser()
  recipient    = conversation.recipient
  localMessage =
    content: messageText
    content_html: _.escape messageText
    created_at: new Date().toISOString()
    conversation_id: convID
    recipient_id: recipient.id
    user_id: currentUser.id
    sendingError: false
    uuid: uuid

  _localMessages[uuid] = localMessage

addRemoteMessage = (message) ->
  _messages[message.id] = message
  delete _localMessages[message.uuid]

MessageStore = assign new BaseStore(),

  initialize: (messages) ->
    _.forEach messages, (item) ->
      _messages[item.id] = item

  get: (id) ->
    _messages[id]

  getAll: ->
    _messages

  getAllForThread: (conversationID) ->
    convMessages = []

    _.forEach _messages, (item) ->
      convMessages.push(item) if item.conversation_id == conversationID

    _.forEach _localMessages, (item) ->
      convMessages.push(item) if item.conversation_id == conversationID

    convMessages = _.sortBy convMessages, (item) -> new Date(item.created_at).getTime()

    convMessages

  getAllForCurrentThread: ->
    @getAllForThread ConversationStore.getCurrentID()

  getUnreadIDs: (convID) ->
    conversation = ConversationStore.get convID
    messages     = @getAllForThread convID
    recipient    = conversation.recipient
    unreadIDs    = []

    _.forEach messages, (item) ->
      if item.read_at is null and recipient.id != item.recipient_id
        unreadIDs.push item.id

    unreadIDs

  getInfo: (message, convID) ->
    conversation = ConversationStore.get convID
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

    when Constants.messenger.CREATE_LOCAL_MESSAGE
      { convID, messageText, uuid } = action
      addLocalMessage convID, messageText, uuid
      MessageStore.emitChange()

    when Constants.messenger.CREATE_REMOTE_MESSAGE
      addRemoteMessage action.message
      MessageStore.emitChange()

    when Constants.messenger.CREATE_REMOTE_MESSAGE_FAIL
      _localMessages[action.uuid]?.sendingError = true
      MessageStore.emitChange()

    when Constants.messenger.READ_MESSAGES
      _.forEach action.ids, (id) ->
        message = _messages[id]
        message.read_at = new Date().toISOString() if message?
      MessageStore.emitChange()