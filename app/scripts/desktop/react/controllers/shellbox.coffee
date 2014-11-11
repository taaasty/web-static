class window.ReactShellBox
  constructor: -> @shellboxContainer = $('<\div>').appendTo('body').get(0)

  #
  # InviteShellBox (vkontakte, emailSignup, selectSignin)
  # EmailSignupShellBox (vkontakte)
  # SelectSigninShellBox (vkontakte, emailSignin, emailSignup)
  # EmailSigninShellBox (vkontakte, recovery)
  # RecoveryShellBox (selectSignin)
  #
  show: (react_class, args) ->
    _.defer  =>
      React.renderComponent ShellBox(null, react_class(args)), @shellboxContainer

    #window.AuthEE.trigger 'enter'
  close: ->
    _.defer =>
      React.unmountComponentAtNode @shellboxContainer
      #React.renderComponent React.DOM.div(), @shellboxContainer

