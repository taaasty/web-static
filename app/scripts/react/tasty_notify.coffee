Notification = require './components/notification'

window.TastyNotify =
  notify: (type, text, timeout = 3000) ->
    $container = $('<\div>').appendTo 'body'
    React.renderComponent Notification(
        type:    type
        text:    text
        timeout: timeout
      ), $container.get(0)
    return

  errorResponse: (response, timeout = 3000) ->
    message = response.message if response.message?
    message ||= response.responseJSON.error if response.responseJSON?
    message ||= response.error if response.error?
    # fallback для старого API
    message ||= "Ошибка сети: #{response.statusText}"
    @notify 'error', message, timeout

  hideAll: ->
    $('.notice').fadeOut 'fast', -> @parentNode.remove()