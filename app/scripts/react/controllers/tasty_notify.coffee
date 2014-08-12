window.TastyNotifyController =

  HIDE_EVENT: TastyNotify.HIDE_EVENT

  notify: (type, text, timeout = 5000) ->
    container = $('<\div>').appendTo('body').get(0)
    React.renderComponent TastyNotify(
        type:    type
        text:    text
        timeout: timeout
      ), container
    return

  notifySuccess: (text, timeout = 5000) ->
    @notify 'success', text, timeout

  errorResponse: (response, timeout = 5000) ->
    return if response.statusText is 'abort'

    # Непонятно почему не rejected не должно показывать
    # например 500-ая ошибка при встевке url-а в video пост 
    # генерирует именно rejected
    # return if response.state?() == 'rejected'
    #

    if response.responseJSON?
      json = response.responseJSON

      console.error? 'errorResponse JSON', json
      message = json.message if json.message?
      message = json.long_message if json.long_message?
      message ||= json.error if json.error? && json.error.length>0
    else
      message = "Ошибка сети: #{response.statusText}"

    @notify 'error', message, timeout

  hideAll: ->
    $(document).trigger @HIDE_EVENT
