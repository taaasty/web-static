#  require JSXTransformer
#= require react
#= require react_ujs
#= require_tree ./mixins
#= require_tree ./components
#= require_tree ./controllers


window.ReactApp = 
  start: ->
    console.log 'ReactApp start'

    @shellboxContainer = $('<\div>').appendTo('body').get(0)
    @popupContainer    = $('<\div>').appendTo('body').get(0)
    @calendarContainer = document.getElementById 'js-calendar-container'

    $(document).on 'page:change', ReactUjs.mountReactComponents

  showPopup: (react_class, args) ->
    _.defer => React.renderComponent PopupBox(args, react_class(args)), @popupContainer

  closePopup: ->
    _.defer => React.unmountComponentAtNode @popupContainer

  showCalendar: (args) ->
    _.defer => React.renderComponent Calendar(args), @calendarContainer

  #
  # InviteShellBox (vkontakte, emailSignup, selectSignin)
  # EmailSignupShellBox (vkontakte)
  # SelectSigninShellBox (vkontakte, emailSignin, emailSignup)
  # EmailSigninShellBox (vkontakte, recovery)
  # RecoveryShellBox (selectSignin)
  #
  showShellBox: (react_class, args) ->
    _.defer  =>
      React.renderComponent ShellBox(null, react_class(args)), @shellboxContainer

    #window.AuthEE.trigger 'enter'
  closeShellBox: ->
    _.defer =>
      React.unmountComponentAtNode @shellboxContainer
      #React.renderComponent React.DOM.div(), @shellboxContainer

$ ->
  if Tasty.user?
    $('[toolbar-settings-click]').click -> ReactApp.showPopup    ToolbarSettings, title: 'Настройки', user: Tasty.user
  else
    $('[invite-button]').click          -> ReactApp.showShellBox InviterShellBox

  # Calendar
  ReactApp.showCalendar()

  # TODO Сделать что-то типа $('[static-inviter]').renderReactComponent InviterShellBox(fixed: true)
  inviterContainer  = document.getElementById 'js-static-inviter-container'
  if inviterContainer?
    React.renderComponent InviterShellBox(fixed: true), inviterContainer