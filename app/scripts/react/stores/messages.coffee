CHANGE_EVENT = 'change'

_messages = {}

# function _addMessages(rawMessages) {
#   rawMessages.forEach(function(message) {
#     if (!_messages[message.id]) {
#       _messages[message.id] = ChatMessageUtils.convertRawMessage(
#         message,
#         ThreadStore.getCurrentID()
#       );
#     }
#   });
# }

window.MessagesStore = _.extend {}, EventEmitter.prototype, {

  emitChange: ->
    @emit CHANGE_EVENT

  addChangeListener: (callback) ->
    @on CHANGE_EVENT, callback

  removeChangeListener: (callback) ->
    @off CHANGE_EVENT, callback

  addMessage: (message, conversationId) ->
    _messages[conversationId].push message

  getMessages: (conversationId) -> _messages[conversationId] ? []

  updateMessages: (conversationId, messages) ->
    _messages[conversationId] = messages

  getMessageInfo: (message, conversationId) ->
    conversation = ConversationsStore.getConversation conversationId
    currentUser  = CurrentUserStore.getUser()
    recipient    = conversation.recipient

    if recipient.id == message.recipient_id
      messageInfo = { type: 'outgoing', user: currentUser }
    else
      messageInfo = { type: 'incoming', user: recipient }

    messageInfo

}

MessagesStore.dispatchToken = MessagingDispatcher.register (payload) ->
  action = payload.action

  switch action.type
    when 'messageListUpdated'
      MessagesStore.updateMessages action.conversationId, action.messages
      MessagesStore.emitChange()
      break

# var MessageStore = merge(EventEmitter.prototype, {

#   emitChange: function() {
#     this.emit(CHANGE_EVENT);
#   },

#   /**
#    * @param {function} callback
#    */
#   addChangeListener: function(callback) {
#     this.on(CHANGE_EVENT, callback);
#   },

#   get: function(id) {
#     return _messages[id];
#   },

#   getAll: function() {
#     return _messages;
#   },

#   /**
#    * @param {string} threadID
#    */
#   getAllForThread: function(threadID) {
#     var threadMessages = [];
#     for (var id in _messages) {
#       if (_messages[id].threadID === threadID) {
#         threadMessages.push(_messages[id]);
#       }
#     }
#     threadMessages.sort(function(a, b) {
#       if (a.date < b.date) {
#         return -1;
#       } else if (a.date > b.date) {
#         return 1;
#       }
#       return 0;
#     });
#     return threadMessages;
#   },

#   getAllForCurrentThread: function() {
#     return this.getAllForThread(ThreadStore.getCurrentID());
#   },

#   getCreatedMessageData: function(text) {
#     var timestamp = Date.now();
#     return {
#       id: 'm_' + timestamp,
#       threadID: ThreadStore.getCurrentID(),
#       authorName: 'Bill', // hard coded for the example
#       date: new Date(timestamp),
#       text: text,
#       isRead: true
#     };
#   }

# });

# MessageStore.dispatchToken = ChatAppDispatcher.register(function(payload) {
#   var action = payload.action;

#   switch(action.type) {

#     case ActionTypes.CLICK_THREAD:
#       ChatAppDispatcher.waitFor([ThreadStore.dispatchToken]);
#       _markAllInThreadRead(ThreadStore.getCurrentID());
#       MessageStore.emitChange();
#       break;

#     case ActionTypes.CREATE_MESSAGE:
#       var message = MessageStore.getCreatedMessageData(action.text);
#       _messages[message.id] = message;
#       MessageStore.emitChange();
#       break;

#     case ActionTypes.RECEIVE_RAW_MESSAGES:
#       _addMessages(action.rawMessages);
#       ChatAppDispatcher.waitFor([ThreadStore.dispatchToken]);
#       _markAllInThreadRead(ThreadStore.getCurrentID());
#       MessageStore.emitChange();
#       break;

#     default:
#       // do nothing
#   }

# });

# module.exports = MessageStore;
