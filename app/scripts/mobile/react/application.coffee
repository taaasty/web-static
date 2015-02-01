window.i18n = require 'i18next'
ReactUjs    = require 'reactUjs'

window.ReactApp =

  start: (locale) ->
    console.log 'ReactApp start'

    i18n.init
      lng: locale
      resGetPath: TastySettings.localesPath + '/__lng__.json'
    , ->
      console.log 'Locales loaded'
      ReactUjs.initialize()