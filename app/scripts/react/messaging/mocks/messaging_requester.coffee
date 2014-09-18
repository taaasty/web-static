class window.MockMessagingRequester

  constructor: ({ @access_token }) ->

  connectUrl: -> '/connect'

  makeConnect: ->
    dfd = $.Deferred()
    @error ||= -1
    @error += 1

    console.info "Соединяемся с сервером сообщений. Url: #{ @connectUrl() }"

    if @error % 2 == 0
      setTimeout (-> dfd.resolve MessagingMocker.stubMessagingMetaInfo()), 1000
    else
      setTimeout (-> dfd.reject {errorMessage: 'Ошибка установки соединения!'}), 2000

    dfd.promise()

  makeNewConversation: (recipientSlug)->
    dfd = $.Deferred()

    console.info "Создаем новую переписку с #{recipientSlug}"
    setTimeout (-> dfd.resolve MessagingMocker.stubIncomingConversation(recipientSlug) ), 1000

    dfd.promise()