global.i18n      = require 'i18next'
i18xhr = require 'i18next-xhr-backend';
ReactUjs         = require 'reactUjs'
MessagingService = require './services/messaging'

initLocales = (locale, callback) ->
  i18n
    .use(i18xhr)
    .init({
      lng: locale,
      fallbackLng: 'ru',
      backend: {
        loadPath: Routes.locale()
      }
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
