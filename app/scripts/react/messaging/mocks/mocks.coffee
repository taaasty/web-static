window.MessagingMocker=
  stubMessagingStatus: ->
    @totalUnreadConversationsCount ||=0
    @totalUnreadConversationsCount +=1
    new MessagingStatus
      totalUnreadConversationsCount: @totalUnreadConversationsCount

  stubIncomingConversation: ->
    @conversationId ||= 0
    @conversationId +=1
    new IncomingConversation
      id: @conversationId
      updatedAt: '20014-10-10'
      participants: [window.tastyUser, @stubUser()]
      design:
        backgroundUrl: 'http://taaasty.ru/images/no_picture.png'
        userpic: window.tastyUser.userpic
      status: @stubConversationStatus()
      messages: [@stubIncomingMessage(), @stubOutgoingMessage(), @stubIncomingMessage(), @stubOutgoingMessage()]

  stubIncomingMessage: ->
    new Message
      createdAt: '2014-09-09'
      senderId: 1
      recipientId: 2
      readAt: null
      contentHtml: 'Сообщение <b>Жирное</b>'

  stubConversationStatus: ->
    @convTotalMessagesCount ||= 0
    @convTotalMessagesCount += 1
    @convUnreadMessagesCount ||= 0
    @convUnreadMessagesCount += 1
    new ConversationStatus
      totalMessagesCount: @convTotalMessagesCount
      unreadMessagesCount: @convUnreadMessagesCount

  stubUser: ->
    @userId ||= 0
    @userId +=1
    @userName = 'vasya' + @userId
    new User
      id: @userId
      name: @userName
      slug: @userName
