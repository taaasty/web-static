window.i18n = require 'i18next'
ReactUjs = require 'reactUjs'
PopupActions = require './actions/popup'
DesignActionCreators = require './actions/design'
AppDispatcher = require './dispatchers/dispatcher'
GuideController = require './controllers/guide'
LayoutStatesController = require './controllers/layoutStates'
PopupController = require './controllers/popuup'
PadController = require './controllers/pad'
numeral = require 'numeral'
injectTapEventPlugin = require 'react-tap-event-plugin'
FeedsUpdateService = require './services/FeedsUpdateService';

initLocales = (locale, callback) ->
  numeral.language(locale)
  moment.locale(locale)
  i18n.init({
    lng: locale,
    fallbackLng: 'ru',
    cache: true,
    resGetPath: Routes.locale()
  }, callback)

initRoutes = ->
  hasAccessBySlug = (urlSlug) ->
    user = CurrentUserStore.getUser()
    userLogged = CurrentUserStore.isLogged()

    return if !userLogged || urlSlug.slice(1).toLowerCase() != user?.slug then false else true

  UserRouteTarget =
    profile: -> TastyEvents.emit TastyEvents.keys.command_hero_open()
    settings: (req) ->
      return unless hasAccessBySlug(req.params.slug)
      PopupActions.showSettings()
    design_settings: (req) ->
      return unless hasAccessBySlug(req.params.slug)
      PopupActions.showDesignSettings(req.params.slug)
    showRequestedById: (req) ->
      return unless hasAccessBySlug(req.params.slug)
      PopupActions.showFriends('vkontakte', Number(req.params.id))
    showRequested: (req) ->
      return unless hasAccessBySlug(req.params.slug)
      PopupActions.showFriends('requested')
    showVkontakte: (req) ->
      return unless hasAccessBySlug(req.params.slug)
      PopupActions.showFriends('vkontakte')
    showFacebook: (req) ->
      return unless hasAccessBySlug(req.params.slug)
      PopupActions.showFriends('facebook')

  Aviator.setRoutes
    '/:slug':
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

    FeedsUpdateService();

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
    @padController = new PadController()

    @shellbox = new ReactShellBox()
    @popup    = new ReactPopup()

    # Есть только у анонимов
    $('[invite-button]').click => @shellbox.show Auth

    # Тултип для шаринга
    $("[tooltip]").tooltip()

    $('.js-connection-start').connection({
      connectionEnd: '.js-connection-end',
      connectionLineClass: 'connection-line'
    });

    # GuideController.start()
