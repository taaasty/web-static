window.i18n = require 'i18next'
ReactUjs = require 'reactUjs'
PopupActions = require './actions/popup'
DesignActionCreators = require './actions/design'
AppDispatcher = require './dispatchers/dispatcher'
GuideController = require './controllers/guide'
LayoutStatesController = require './controllers/layoutStates'
PopupController = require './controllers/popuup'
numeral = require 'numeral'
injectTapEventPlugin = require 'react-tap-event-plugin'

initLocales = (locale, callback) ->
  numeral.language(locale)
  moment.locale(locale)
  i18n.init({
    lng: locale,
    fallbackLng: 'ru',
    resGetPath: Routes.locale()
  }, callback)

initRoutes = ->
  UserRouteTarget =
    profile:                 -> TastyEvents.emit TastyEvents.keys.command_hero_open()
    settings:                -> PopupActions.showSettings()
    design_settings:         -> PopupActions.showDesignSettings()
    showRequestedById: (req) -> PopupActions.showFriends('vkontakte', Number(req.params.id))
    showRequested:           -> PopupActions.showFriends('requested')
    showVkontakte:           -> PopupActions.showFriends('vkontakte')
    showFacebook:            -> PopupActions.showFriends('facebook')

  Aviator.setRoutes
    '/:user':
      target: UserRouteTarget
      '/profile': 'profile'
      '/settings': 'settings'
      '/design_settings': 'design_settings'
      '/friends':
        '/requested':
          '/': 'showRequested'
          '/:id': 'showRequestedById'
        '/vkontakte': 'showVkontakte'
        '/facebook': 'showFacebook'

  Aviator.dispatch()

window.ReactApp =

  start: ({user, locale}) ->
    console.log 'ReactApp start'

    if user?
      CurrentUserDispatcher.setupUser user
      window.messagingService = new MessagingService
        user: CurrentUserStore.getUser()

      DesignActionCreators.initCurrent CurrentUserStore.getUser().design

    initLocales(locale, ->
      console.log 'Locales loaded'
      ReactUjs.initialize()
      initRoutes()
    )

    # Needed for onTouchTap
    # Can go away when react 1.0 release
    # Check this repo:
    # https://github.com/zilverline/react-tap-event-plugin
    injectTapEventPlugin()

    @layoutStatesController = new LayoutStatesController()
    @popupController = new PopupController()

    @shellbox = new ReactShellBox()
    @popup    = new ReactPopup()

    # Есть только у анонимов
    $('[invite-button]').click => @shellbox.show Auth

    # Тултип для шаринга
    $("[tooltip]").tooltip()

    # GuideController.start()