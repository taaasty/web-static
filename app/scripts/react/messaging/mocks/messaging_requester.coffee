class window.MockMessagingRequester

  constructor: ({ @access_token }) ->

  connectUrl: -> '/connect'

  makeConnect: ->
    dfd = $.Deferred()

    console.info "Соединяемся с сервером сообщений. Url: #{ @connectUrl() }"
    setTimeout ->
      dfd.resolve {
        status:              new MessagingStatus()
        activeConversations: [new Conversation(), new Conversation()]
      }
    , 3000

    dfd.promise()