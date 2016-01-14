React = require 'react';
{ render, unmountComponentAtNode } = require 'react-dom';
Notify = require '../components/alerts/notify'

_pendingNotification = null

getContainer = ->
  container = document.querySelector '[notify-container]'

  unless container?
    container = document.createElement 'div'
    container.setAttribute 'notify-container', ''
    document.body.appendChild container

  container

closeNotification = ->
  container = getContainer()

  unmountComponentAtNode container
  _pendingNotification = null

isPageLoadingCanceled = (xhr) ->
  # Вернет true, если во время запроса пользователь:
  # - Остановил загрузку страницы
  # - Перешёл на другую страницу
  xhr.status == 0

NotifyController =

  notify: (type, text, timeout = 3000) ->
    container = getContainer()

    closeNotification()

    notification = render (
      <Notify
          type={ type }
          text={ text }
          timeout={ timeout }
          onClose={ closeNotification } />
    ), container

    _pendingNotification = notification

  notifySuccess: (text, timeout = 3000) ->
    @notify 'success', text, timeout

  notifyError: (text, timeout = 3000) ->
    @notify 'error', text, timeout

  errorResponse: (xhr, timeout = 3000) ->
    return if xhr._aborted is true

    if xhr.responseText
      json = JSON.parse xhr.responseText

      message = switch
        when json.message      then json.message
        when json.long_message then json.long_message
        when json.error        then json.error
    else
      message = "Ошибка сети: #{xhr.statusText}"

    unless isPageLoadingCanceled xhr
      @notify 'error', message, timeout

module.exports = NotifyController
