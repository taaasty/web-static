class window.MessagingRequester

  constructor: ({ @access_token, @socket_id }) ->

  notifyReady: ({ success, error }) ->
    $.ajax
      url: ApiRoutes.messenger_ready_url()
      data:
        socket_id: @socket_id
      method: 'POST'
      success: success
      error:   error

  postNewConversation: (recipientId, content) ->
    $.ajax
      url: ApiRoutes.messengerConversationsByUserId recipientId
      method: 'POST'
      data:
        socket_id: @socket_id
        content: content

  loadMessages: (conversationId) ->
    $.ajax
      url: ApiRoutes.messenger_load_messages_url conversationId
      data:
        socket_id: @socket_id

  loadMoreMessages: (conversationId, toMessageId) ->
    $.ajax
      url: ApiRoutes.messenger_load_messages_url conversationId
      data:
        socket_id:     @socket_id
        to_message_id: toMessageId
        limit:         10

  postMessage: (conversationId, content, files, uuid) ->
    formData = new FormData()
    formData.append('socket_id', @socket_id)
    formData.append('content', content)
    formData.append('uuid', uuid)
    files.forEach((file) ->
      formData.append('files[]', file)
    )
      
    $.ajax
      url: ApiRoutes.messenger_new_message_url conversationId
      method: 'POST'
      data: formData
      processData: false
      contentType: false

  markAsReadMessage: (conversationId, messageId) ->
    $.ajax
      url: ApiRoutes.messenger_read_messages_url conversationId
      method: 'POST'
      data:
        _method: 'PUT'
        socket_id: @socket_id
        ids: messageId

  markAsReadNotification: (notificationId) ->
    $.ajax
      url: ApiRoutes.notifications_read_url notificationId
      method: 'POST'
      data:
        _method: 'PUT'
        socket_id: @socket_id
        id: notificationId
