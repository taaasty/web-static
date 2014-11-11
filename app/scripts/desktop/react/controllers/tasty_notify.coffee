window.TastyNotifyController =

  _notificationList: []

  notify: (type, text, timeout = 5000) ->
    container = $('<\div>').appendTo('body').get(0)

    notification = React.renderComponent TastyNotify(
      type:    type
      text:    text
      timeout: timeout
      onClose: @_removeNotification.bind @
    ), container

    @_notificationList.push notification

  notifySuccess: (text, timeout = 5000) ->
    @notify 'success', text, timeout

  errorResponse: (response, timeout = 5000) ->
    return if response.statusText is 'abort'

    # Непонятно почему не rejected не должно показывать
    # например 500-ая ошибка при вставке url-а в video пост
    # генерирует именно rejected
    # return if response.state?() == 'rejected'

    if response.responseJSON?
      json = response.responseJSON

      console.error? 'errorResponse JSON', json
      message = json.message if json.message?
      message = json.long_message if json.long_message?
      message ||= json.error if json.error? && json.error.length > 0
    else
      message = "Ошибка сети: #{response.statusText}"

    unless @_isPageLoadingCanceled response
      @notify 'error', message, timeout

  hideAll: ->
    @_notificationList.forEach (notification) -> notification.close()

  _removeNotification: (notification) ->
    @_notificationList = _.without @_notificationList, notification

  _isPageLoadingCanceled: (response) ->
    # Вернет true, если во время запроса пользователь:
    # - Остановил загрузку страницы
    # - Перешёл на другую страницу
    response.statusText is 'error' && response.status == 0 && response.readyState == 0

#*==========  Глобальные команды  ==========*#

TastyEvents.on TastyEvents.keys.command_current_notification_hide(), ->
  TastyNotifyController.hideAll()

#*-----  End of Глобальные команды  ------*#