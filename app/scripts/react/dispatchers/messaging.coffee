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

  connected: ->
    MessagingDispatcher.handleServerAction type: 'connected'

  connectionError: (error) ->
    console.error? "Can't subscribe to private user channel. Error is #{error}"
    MessagingDispatcher.handleServerAction type: 'connectionError', error: error