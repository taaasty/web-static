window.MessagingDispatcher = _.extend new Dispatcher(),

  handleViewAction: (action) ->
    @dispatch { source: 'VIEW_ACTION', action }

  handleServerAction: (action) ->
    @dispatch { source: 'SERVER_ACTION', action }

  updateMessagingStatus: (messagingStatus) ->
    MessagingDispatcher.handleServerAction
      type: 'updateMessagingStatus'
      messagingStatus: messagingStatus

  updateActiveConversations: (activeConversations) ->
    console.log 'Receive activeConversations', activeConversations
    MessagingDispatcher.handleServerAction {
      type: 'updateActiveConversations'
      activeConversations: activeConversations
    }

  updateConversation: (conversation) ->
    MessagingDispatcher.handleServerAction {
      type: 'updateConversation'
      conversation: conversation
    }
    console.log 'conversation updated', conversation

  changeConnectionState: (state) ->
    MessagingDispatcher.handleServerAction {
      type:  'connectionState'
      state: state
    }

  messageReceived: (message) ->
    console.info 'Получено сообщение', message

    if message.user_id != CurrentUserStore.getUser().id
      TastySoundController.incomingMessage()

    MessagingDispatcher.handleServerAction {
      type: 'messageReceived'
      conversationId: message.conversation_id
      message: message
    }

  messagesUpdated: (data) ->
    MessagingDispatcher.handleServerAction {
      type: 'messagesUpdated'
      conversationId: data.conversation_id
      messages: data.messages
    }

  messageSubmitted: ({ conversationId, content, uuid }) ->
    conversation = ConversationsStore.getConversation conversationId
    currentUser  = CurrentUserStore.getUser()
    recipient    = conversation.recipient
    message      = {
      content:         content
      content_html:    _.escape(content)
      conversation_id: conversationId
      recipient_id:    recipient.id
      user_id:         currentUser.id
      uuid:            uuid
    }

    MessagingDispatcher.handleViewAction {
      type: 'messageSubmitted'
      conversationId: conversationId
      message: message
    }