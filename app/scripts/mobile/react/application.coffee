global.i18n      = require 'i18next'
ReactUjs         = require 'reactUjs'
MessagingService = require './services/messaging'

initLocales = (locale, callback) ->
  i18n.init({
    lng: locale,
    fallbackLng: 'ru',
    resGetPath: Routes.locale()
  }, callback)

window.ReactApp =
  messagingService: null

  start: ({locale, userID, userToken}) ->
    console.log 'ReactApp start'

    initLocales(locale, ->
      console.log 'Locales loaded'
      ReactUjs.initialize()
    )

    if userID and userToken
      @messagingService = new MessagingService userID, userToken