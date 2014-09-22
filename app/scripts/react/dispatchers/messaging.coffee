window.MessagingDispatcher = _.extend new Dispatcher(),

  handleViewAction: (action) ->
    @dispatch { source: 'VIEW_ACTION', action }

  handleServerAction: (action) ->
    @dispatch { source: 'SERVER_ACTION', action }

  updateMessagingStatus: (messagingStatus) ->
    MessagingDispatcher.handleServerAction
      type:            'updateMessagingStatus'
      messagingStatus: messagingStatus

  updateActiveConversations: (activeConversations) ->
    console.log 'Receive activeConversations', activeConversations
    MessagingDispatcher.handleServerAction
      type:               'updateActiveConversations'
      activeConversations: activeConversations

  updateConversation: (conversation) ->
    MessagingDispatcher.handleServerAction
      type:         'updateConversation'
      conversation: conversation
    console.log 'conversation updated', conversation

  changeConnectionState: (state) ->
    MessagingDispatcher.handleServerAction
      type:  'connectionState'
      state: state