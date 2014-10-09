class window.MessagingRequester

  constructor: ({ @access_token, @socket_id }) ->

  notifyReady: ({ success, error }) ->
    $.ajax
      url: Routes.api.messenger_ready_url()
      data:
        socket_id: @socket_id
      method: 'POST'
      success: success
      error:   error

  postNewConversation: (recipientSlug, content) ->
    $.ajax
      url: Routes.api.messenger_new_conversation_url(recipientSlug)
      method: 'POST'
      data:
        socket_id: @socket_id
        content: content

  loadMessages: (conversationId) ->
    $.ajax
      url: Routes.api.messenger_load_messages_url conversationId
      data:
        socket_id: @socket_id

  loadMoreMessages: (conversationId, toMessageId) ->
    $.ajax
      url: Routes.api.messenger_load_messages_url conversationId
      data:
        socket_id:     @socket_id
        to_message_id: toMessageId
        limit:         10

  postMessage: (conversationId, content, uuid) ->
    $.ajax
      url: Routes.api.messenger_new_message_url conversationId
      method: 'POST'
      data: { @socket_id, content, uuid }

  markAsReadMessage: (conversationId, messageId) ->
    $.ajax
      url: Routes.api.messenger_read_messages_url conversationId
      method: 'PUT'
      data:
        socket_id: @socket_id
        ids: messageId

  markAsReadNotification: (notificationId) ->
    $.ajax
      url: Routes.api.notifications_read_url notificationId
      method: 'PUT'
      data:
        socket_id: @socket_id
        id: notificationId