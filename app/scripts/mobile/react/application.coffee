global.i18n      = require 'i18next'
ReactUjs         = require 'reactUjs'
MessagingService = require './services/messaging'

window.ReactApp =
  messagingService: null

  start: ({locale, userID, userToken}) ->
    console.log 'ReactApp start'

    i18n.init
      lng: locale
      fallbackLng: 'ru'
      resGetPath: TastySettings.localesPath + '/__lng__.json'
    , ->
      console.log 'Locales loaded'
      ReactUjs.initialize()

    if userID and userToken
      @messagingService = new MessagingService userID, userToken