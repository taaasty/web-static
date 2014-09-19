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

  #postMessage: (conversationId, content) ->
    #$.ajax 
    #url: postMessageUrl(conversationId),
      #method: 'POST'
      #data:
        #content: content

  #markMessageAsRead: (msgId) ->
    #$.ajax markMessageAsReadUrl(msgId),
      #method: 'POST'

  #loadMoreMessages: (convId, toMessageId, limit) ->
    #$.ajax conversationMessagesUrl(convId),
      #method: 'GET'
      #data:
        #to_message_id: toMessageId
        #limit: limit
