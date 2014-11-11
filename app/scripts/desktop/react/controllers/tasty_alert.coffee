window.TastyAlertController =

  show: ({title, message, buttonText, buttonColor, onAccept}) ->
    if isMobile()
      regex   = /<br\s*[\/]?>/gi
      message = message.replace regex, '\n'

      alert message

      onAccept() if onAccept?
    else
      container = document.querySelectorAll('[tasty-alert-container]')[0]

      unless container
        container = $('<\div>', {'tasty-alert-container': ''}).appendTo('body')[0]

      React.renderComponent TastyAlert(
        {title, message, buttonText, buttonColor, onAccept}
      ), container