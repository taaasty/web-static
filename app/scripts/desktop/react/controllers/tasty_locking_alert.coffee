window.TastyLockingAlertController =

  show: ({title, message, action}) ->
    if isMobile()
      regex   = /<br\s*[\/]?>/gi
      message = message.replace regex, '\n'

      alert message

      action() if action?
    else
      container = document.querySelectorAll('[tasty-alert-container]')[0]

      unless container
        container = $('<\div>', {'tasty-alert-container': ''}).appendTo('body')[0]

      React.renderComponent TastyLockingAlert(
        {title, message, action}
      ), container