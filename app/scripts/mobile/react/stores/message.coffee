_                 = require 'lodash'
assign            = require 'react/lib/Object.assign'
BaseStore         = require './_base'
ConversationStore = require './conversation'
CurrentUserStore  = require './currentUser'
Constants         = require '../constants/constants'
AppDispatcher     = require '../dispatcher/dispatcher'
{
  LOAD_MESSAGES,
  CREATE_LOCAL_MESSAGE,
  CREATE_REMOTE_MESSAGE,
  CREATE_REMOTE_MESSAGE_FAIL,
  READ_MESSAGES,
  PUBLIC_CONVERSATION,
  GROUP_CONVERSATION,
} = require '../constants/MessengerConstants';
{
  PUSH_MESSAGE,
  UPDATE_MESSAGES,
  DELETE_MESSAGES,
  DELETE_USER_MESSAGES,
} = require '../constants/MessagingConstants';

_messages = {}      # Key is message id
_localMessages = {} # Key is message uuid

addLocalMessage = (convID, messageText, uuid) ->
  conversation = ConversationStore.get convID
  currentUser  = CurrentUserStore.getUser()
  localMessage =
    content: messageText
    content_html: _.escape messageText
    created_at: new Date().toISOString()
    conversation_id: convID
    user_id: conversation.user_id
    sendingError: false
    uuid: uuid

  _localMessages[uuid] = localMessage

addRemoteMessage = (message) ->
  _messages[message.id] = message
  delete _localMessages[message.uuid]

MessageStore = assign new BaseStore(),

  initialize: (messages) ->
    _messages = {}
    _.forEach messages, (item) ->
      _messages[item.id] = item

  get: (id) ->
    _messages[id]

  getAll: ->
    _messages

  getAllForThread: (conversationID) ->
    serverMessages = []
    localMessages = []

    _.forEach(_localMessages, (item) ->
      localMessages.push(item) if item.conversation_id == conversationID)

    _.forEach(_messages, (item) ->
      serverMessages.push(item) if item.conversation_id == conversationID)

    sort = (arr) -> _.sortBy(arr, (item) -> new Date(item.created_at).getTime())

    sort(serverMessages).concat(sort(localMessages))

  getAllForCurrentThread: ->
    @getAllForThread ConversationStore.getCurrentID()

  getUnreadIDs: (convID) ->
    conversation = ConversationStore.get(convID);
    messages     = @getAllForThread(convID);
    unreadIDs    = []

    _.forEach(messages, (item) ->
      if item.read_at is null and conversation.user_id != item.user_id
        unreadIDs.push(item.id));

    unreadIDs

  getInfo: (message, convID) ->
    conversation = ConversationStore.get(convID);

    if conversation.type == PUBLIC_CONVERSATION or conversation.type == GROUP_CONVERSATION
      msgAuthor = conversation.users.filter((u) -> u.id == message.user_id)[0];

      messageInfo = {
        type: if message.user_id == conversation.user_id then 'outgoing' else 'incoming',
        user: msgAuthor,
      }
    else
      currentUser  = CurrentUserStore.getUser()
      recipient    = conversation.recipient

      messageInfo = if conversation.user_id == message.user_id
        { type: 'outgoing', user: currentUser }
      else
        { type: 'incoming', user: recipient }

    messageInfo

module.exports = MessageStore

MessageStore.dispatchToken = AppDispatcher.register (payload) ->
  action = payload.action

  switch action.type
    when LOAD_MESSAGES
      _.forEach action.messages, (item) -> _messages[item.id] = item
      MessageStore.emitChange()

    when CREATE_LOCAL_MESSAGE
      { convID, messageText, uuid } = action
      addLocalMessage convID, messageText, uuid
      MessageStore.emitChange()

    when CREATE_REMOTE_MESSAGE
      addRemoteMessage action.message
      MessageStore.emitChange()

    when CREATE_REMOTE_MESSAGE_FAIL
      _localMessages[action.uuid]?.sendingError = true
      MessageStore.emitChange()

    when READ_MESSAGES
      _.forEach action.ids, (id) ->
        message = _messages[id]
        message.read_at = new Date().toISOString() if message?
      MessageStore.emitChange()

    when PUSH_MESSAGE
      addRemoteMessage(action.message);
      MessageStore.emitChange();

    when UPDATE_MESSAGES
      _.forEach(action.messages, (item) -> _.extend(_messages[item.id], item));
      MessageStore.emitChange();

    when DELETE_MESSAGES
      action.messages.forEach((msg) -> delete _messages[msg.id]);
      MessageStore.emitChange();

    when DELETE_USER_MESSAGES
      action.messages.forEach((deleted) ->
        { id, content } = deleted;

        if (_messages[id])
          _.extend(_messages[id], deleted, { content_html: content })
      )
