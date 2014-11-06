CHANGE_EVENT = 'change'

_conversations = []

window.ConversationsStore = _.extend {}, EventEmitter.prototype, {

  emitChange: ->
    @emit CHANGE_EVENT

  addChangeListener: (callback) ->
    @on CHANGE_EVENT, callback

  removeChangeListener: (callback) ->
    @off CHANGE_EVENT, callback

  unshiftConversations: (conversations) ->
    clonedConversations = _conversations.slice(0)

    for conversation in conversations
      unless @isConversationExists conversation
        clonedConversations.unshift conversation

    _conversations = clonedConversations

  updateConversation: (data) ->
    clonedConversations = _conversations.slice(0)

    for conversation, i in clonedConversations
      if conversation.id == data.id
        clonedConversations[i] = data
        break

    _conversations = clonedConversations

  preloadConversationsImages: (conversations) ->
    for conversation in conversations
      image = new Image()
      image.src = conversation.recipient.design.background_url

  getConversation: (conversationId) ->
    for conversation in _conversations
      return conversation if conversation.id is conversationId

  getConversationBySlug: (recipientSlug) ->
    for conversation in _conversations
      return conversation if conversation.recipient.slug is recipientSlug

  getActiveConversations: -> _conversations

  sortByDesc: ->
    clonedConversations = _conversations.slice(0)

    clonedConversations.sort (a, b) ->
      new Date(b.updated_at) - new Date(a.updated_at)

    _conversations = clonedConversations

  isConversationExists: (conversation) ->
    for cnv in _conversations
      return true if cnv.id is conversation.id

    false

}

ConversationsStore.dispatchToken = MessagingDispatcher.register (payload) ->
  action = payload.action

  switch action.type
    when 'postNewConversation'
      ConversationsStore.unshiftConversations [action.conversation]
      ConversationsStore.preloadConversationsImages [action.conversation]
      ConversationsStore.emitChange()
      break
    when 'conversationsLoaded'
      ConversationsStore.unshiftConversations action.conversations
      ConversationsStore.preloadConversationsImages action.conversations
      ConversationsStore.sortByDesc()
      ConversationsStore.emitChange()
      break
    when 'updateConversation'
      if ConversationsStore.isConversationExists action.conversation
        ConversationsStore.updateConversation action.conversation
      else
        ConversationsStore.unshiftConversations [action.conversation]
        ConversationsStore.preloadConversationsImages [action.conversation]

      ConversationsStore.sortByDesc()
      ConversationsStore.emitChange()
      break