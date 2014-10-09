window.NotificationActions = 

  readNotification: (notificationId) ->
    console.log 'читаем уведомление', notificationId
    messagingService.markAsReadNotification notificationId