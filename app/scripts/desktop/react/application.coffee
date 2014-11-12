ReactUjs = require 'reactUjs'

window.ReactApp =

  start: ({ user }) ->
    console.log 'ReactApp start'

    ReactUjs.initialize()

    @shellbox = new ReactShellBox()
    @popup    = new ReactPopup()

    # Есть только у анонимов
    $('[invite-button]').click => @shellbox.show AuthShellbox

    # TODO Сделать что-то типа $('[static-inviter]').renderReactComponent AuthShellbox(fixed: true)
    if ic = document.getElementById 'js-static-inviter-container'
      React.renderComponent AuthShellbox(fixed: true), ic

    if user?
      window.messagingService = new MessagingService
        user: CurrentUserStore.getUser()

    # Aviator.pushStateEnabled = false

    UserRouteTarget = {
      profile:                 -> TastyEvents.emit TastyEvents.keys.command_hero_open()
      settings:                -> TastyEvents.emit TastyEvents.keys.command_settings_open()
      design_settings:         -> TastyEvents.emit TastyEvents.keys.command_design_settings_open()
      showRequestedById: (req) -> TastyEvents.emit TastyEvents.keys.command_requested_open(), +req.params.id
      showRequested:           -> TastyEvents.emit TastyEvents.keys.command_requested_open()
    }

    Aviator.setRoutes {
      '/:user': {
        target: UserRouteTarget
        '/profile': 'profile'
        '/settings': 'settings'
        '/design_settings': 'design_settings'
        '/friends': {
          '/requested': {
            '/': 'showRequested'
            '/:id': 'showRequestedById'
          }
        }
      }
    }

    Aviator.dispatch()