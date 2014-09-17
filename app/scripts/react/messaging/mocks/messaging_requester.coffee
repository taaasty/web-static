class window.MockMessagingRequester

  constructor: ({ @access_token }) ->

  connectUrl: -> '/connect'

  makeConnect: ->
    dfd = $.Deferred()
    @error ||= 0
    @error += 1

    console.info "Соединяемся с сервером сообщений. Url: #{ @connectUrl() }"

    if @error % 2 == 0
      setTimeout (-> dfd.resolve MessagingMocker.stubMessagingMetaInfo()), 2000
    else
      setTimeout (-> dfd.reject {errorMessage: 'Ошибка установки соединения!'}), 2000

    dfd.promise()

  makeNewConversation: ->
    dfd = $.Deferred()

    console.info "Создаем новую переписку"
    setTimeout ->
      dfd.resolve MessagingMocker.stubIncomingConversation()
    , 1000

    dfd.promise()