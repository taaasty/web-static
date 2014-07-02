Notification = require './components/notification'

window.TastyNotify =
  notify: (type, text, timeout = 3000) ->
    if ['error', 'success'].indexOf(type) == -1
      throw new Error "Notification type \"#{type}\" is unknown"

    if typeof(timeout) is 'undefined' or parseInt(timeout) == 0
      timeout = if type == 'error' then 3000 else 10000

    $container = $('<\div>').appendTo 'body'
    React.renderComponent Notification(
        type: type
        text: text
        onClick: this.hideNotices
      ), $container.get(0)

    setTimeout (=> @hideNotices()), timeout
    return

  notifyErrorResponse: (response, timeout = 3000) ->
    message = response.message if response.message?
    message ||= response.responseJSON.error if response.responseJSON?
    message ||= response.error if response.error?
    # fallback для старого API
    message ||= "Ошибка сети: #{response.statusText}"
    @notify 'error', message, timeout

  hideNotices: ->
    $('.notice').fadeOut 'fast', -> @parentNode.remove()