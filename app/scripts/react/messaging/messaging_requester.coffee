class window.MessagingRequester
  metaInfoUrl:               -> '/metaInfo'
  conversationUrl:  (convId) -> "/conversation/:#{convId}"
  newConversationUrl: (slug) -> "/conversation/new/#{slug}"
  postMessageUrl:   (convId) -> "/conversation/:#{convId}/messages/"
  markMessageAsReadUrl: (msgId) -> "/messages/#{msgId}/read"
  conversationOpenUrl: (convId) -> "/conversation/#{convId}/open/"

  conversationMessagesUrl: (convId) -> "/conversation/#{convId}/messages"

  makeMetaInfoRequest:     ->
    $.ajax metaInfoUrl(), method: 'POST'

  # messagesLimit - сколько последних сообщений отдать
  mekeConversationRequest: (convId, messagesLimit) ->
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

  markMessageAsRead: (msgId)
    $.ajax markMessageAsReadUrl(msgId),
      method: 'POST'

  loadMoreMessages: (convId, toMessageId, limit) ->
    $.ajax conversationMessagesUrl(convId),
      method: 'GET'
      data:
        to_message_id: toMessageId
        limit: limit
