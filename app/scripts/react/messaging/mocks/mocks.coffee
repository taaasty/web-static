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
      updatedAt: '2014-07-16T21:24:02+04:00'
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
    }
