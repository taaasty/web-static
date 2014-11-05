ReactUjs = require 'reactUjs'

window.ReactApp =

  start: ({ user }) ->
    console.log 'ReactApp start'

    ReactUjs.initialize()

    @shellbox = new ReactShellBox()
    @popup    = new ReactPopup()

    # Есть только у анонимов
    $('[invite-button]').click => @shellbox.show InviterShellBox

    # TODO Сделать что-то типа $('[static-inviter]').renderReactComponent InviterShellBox(fixed: true)
    if ic = document.getElementById 'js-static-inviter-container'
      React.renderComponent InviterShellBox(fixed: true), ic

    if user?
      window.messagingService = new MessagingService
        user: CurrentUserStore.getUser()

    # Aviator.pushStateEnabled = false

    UserRouteTarget = {
      profile:               -> TastyEvents.emit TastyEvents.keys.command_hero_open()
      settings:              -> TastyEvents.emit TastyEvents.keys.command_settings_open()
      showRequestById: (req) -> TastyEvents.emit TastyEvents.keys.command_requests_open(), +req.params.id
      showRequests:          -> TastyEvents.emit TastyEvents.keys.command_requests_open()
    }

    Aviator.setRoutes {
      '/:user': {
        target: UserRouteTarget
        '/profile': 'profile'
        '/settings': 'settings'
        '/friends': {
          '/requests': {
            '/': 'showRequests'
            '/:id': 'showRequestById'
          }
        }
      }
    }

    Aviator.dispatch()