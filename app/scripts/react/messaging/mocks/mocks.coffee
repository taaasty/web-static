window.MessagingMocker =

  stubMessagingMetaInfo: ->
    {
      status: MessagingMocker.stubMessagingStatus()
      activeConversations: [
        MessagingMocker.stubIncomingConversation()
        MessagingMocker.stubIncomingConversation()
        MessagingMocker.stubIncomingConversation()
        MessagingMocker.stubIncomingConversation()
        MessagingMocker.stubIncomingConversation()
      ]
    }

  stubMessagingStatus: ->
    @totalUnreadConversationsCount ||= 0
    @totalUnreadConversationsCount += 1

    new MessagingStatus { @totalUnreadConversationsCount }

  stubIncomingConversation: ->
    @conversationId ||= 0
    @conversationId +=1

    new IncomingConversation {
      id: @conversationId
      online: true
      updatedAt: new Date().toString()
      participants: [CurrentUserStore.getUser(), @stubUser()]
      design:
        backgroundUrl: 'http://taaasty.ru/images/no_picture.png'
        userpic: CurrentUserStore.getUserpic()
      status: @stubConversationStatus()
      messages: [
        @stubIncomingMessage()
        @stubOutgoingMessage()
        @stubIncomingMessage()
        @stubOutgoingMessage()
      ]
    }

  stubIncomingMessage: ->
    new Message {
      createdAt: '2014-05-25T15:19:50+04:00'
      senderId: 1
      recipientId: 2
      readAt: null
      contentHtml: 'Сообщение <b>Жирное</b> от собеседника'
    }

  stubOutgoingMessage: ->
    new Message {
      createdAt: '2014-05-27T00:38:25+04:00'
      senderId: 2
      recipientId: 1
      readAt: null
      contentHtml: 'Сообщение <b>Жирное</b> от нас'
    }

  stubConversationStatus: ->
    @convTotalMessagesCount ||= @convUnreadMessagesCount ||= 0
    @convTotalMessagesCount  += 1
    @convUnreadMessagesCount += 1

    new ConversationStatus {
      totalMessagesCount:  @convTotalMessagesCount
      unreadMessagesCount: @convUnreadMessagesCount
    }

  stubUser: ->
    @userId ||= 0
    @userId +=1
    @userName = "vasya #{ @userId }"

    new User {
      id:   @userId
      name: @userName
      slug: @userName
      userpic: {
        large_url: 'http://3000.vkontraste.ru/assets/userpic/22/35/17_large.png'
        thumb128_url: 'http://3000.vkontraste.ru/assets/userpic/22/35/17_thumb128.png'
        thumb64_url: 'http://3000.vkontraste.ru/assets/userpic/22/35/17_thumb64.png'
        default_colors: {
          background: '#f37420'
          name: '#fff'
        }
      }
    }
