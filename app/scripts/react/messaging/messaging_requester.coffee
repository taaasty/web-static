class window.MessagingRequester

  conversationUrl:      (convId) -> "/conversation/:#{ convId }"
  newConversationUrl:     (slug) -> "/conversation/new/#{ slug }"
  postMessageUrl:       (convId) -> "/conversation/:#{ convId }/messages/"
  markMessageAsReadUrl:  (msgId) -> "/messages/#{ msgId }/read"
  conversationOpenUrl:  (convId) -> "/conversation/#{ convId }/open/"

  conversationMessagesUrl: (convId) -> "/conversation/#{ convId }/messages"

  constructor: ({ @access_token }) ->

  notifyReady: ({ success, error, socket_id }) ->
    $.ajax {
      url: Routes.api.messenger_ready_url()
      data:
        socket_id: socket_id
      method: 'POST'
      success: success
      error:   error
    }

  # messagesLimit - сколько последних сообщений отдать
  makeConversationRequest: (convId, messagesLimit) ->
    $.ajax conversationUrl(convId),
      method: 'POST'
      data:
        messagesLimit: messagesLimit

  newConversation: (recipientSlug, content) ->
    $.ajax newConverastion(recipientSlug),
      method: 'POST'
      data:
        content: content

  postMessage: (conversationId, content) ->
    $.ajax postMessageUrl(conversationId),
      method: 'POST'
      data:
        content: content

  markMessageAsRead: (msgId) ->
    $.ajax markMessageAsReadUrl(msgId),
      method: 'POST'

  loadMoreMessages: (convId, toMessageId, limit) ->
    $.ajax conversationMessagesUrl(convId),
      method: 'GET'
      data:
        to_message_id: toMessageId
        limit: limit
