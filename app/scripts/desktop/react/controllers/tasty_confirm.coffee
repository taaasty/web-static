window.TastyConfirmController =

  show: ({message, acceptButtonText, rejectButtonText, acceptButtonColor, onAccept}) ->
    if isMobile()
      regex = /<br\s*[\/]?>/gi
      messageWithoutBR = message.replace regex, '\n'

      if confirm messageWithoutBR
        onAccept.call() if _.isFunction(onAccept)
    else
      container = document.querySelectorAll('[tasty-confirm-container]')[0]

      unless container
        container = $('<\div>', {'tasty-confirm-container': ''}).appendTo('body')[0]

      React.render (
        <TastyConfirm
            message={ message }
            acceptButtonText={ acceptButtonText }
            rejectButtonText={ rejectButtonText }
            acceptButtonColor={ acceptButtonColor }
            onAccept={ onAccept } />
      ), container