class window.User extends DModel
  # id
  # userpic
  # name
  #

# Модели генерируемые клиентом
#
class window.NewMessage extends DModel
  # conversationId
  # recipient_id
  # messageContent 

class window.NewConversationMessage extends DModel
  # recipientSlug
  # messageContent 

# Модели генерируемые сервером
#
class window.MessagePayloaded
  # message <Message>
  # conversationInfo <ConversationInfo> 
  # status <MessagingStatus>

# Отсылается сервером когда он сообщает
# что сообщение прочитано.
class window.ConversationStatus
  # totalMessagesCount
  # unreadMessagesCount
  # lastReadMessageId
  # lastMessageId

# Отсылается сервером когда он сообщает
# что сообщение прочитано.
class window.MessagingStatus extends DModel
  # totalConversationsCount
  # activeConversationsCount
  # lastMessageId
  # totalUnreadMessagesCount
  # totalUnreadConversationsCount

class window.MessagingMetaInfo extends DModel
  # messagingStatus = <MessagingStatus>
  # activeConversations = [<Conversation>,..] - список действующих бесед

class window.Conversation extends DModel
  # id
  # createdAt
  # participants = [<User>, <User>]
  # status <ConversationStatus>
  # unreadMessagesCount
  # totalMessagesCount
  # lastMessage <Message>

##
##
#
class window.ConversationPayloaded extends DModel
  # conversation = <Conversation>
  # messages = [<Message>,..] # последние N сообщений

class window.Message extends DModel
  # id
  # conversationId
  # senderId
  # recipientId
  # content
  # contentHtml
  # createdAt
  # readAt  - nil если еще не прочитано

