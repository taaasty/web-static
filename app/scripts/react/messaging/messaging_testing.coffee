# Компонент Сообщения подписывается на все сообщения
# в сервисе:
#

window.MessagingMock =
  message: ->
    sender       = new Sender id: 1, name: 'Вася'
    recipient    = new Recipient id: 1, name: 'Петя'
    conversation = new Conversation id: 123, participants: [sender, recipient]

    new Message
      conversation_id: 123,
      sender_id: sender.id,
      recipient_id: recipient.id,
      content: 'Сообщение',
      content_html: 'Сообщение'

  # Эмулируем получение сообщения
  emulateMessage: ({message}) ->
    message ||= @message()
    messaging.emitEvent "#{message.conversation_id}:message:#{message.id}"

  # Ресипиент прочитал сообщение
  emulateRead: ({message}) ->
    message ||= @message()
    messaging.emitEvent "#{message.conversation_id}:read:#{message.id}"