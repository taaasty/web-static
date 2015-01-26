i18n     = require 'i18next'
ReactUjs = require 'reactUjs'

window.ReactApp =

  start: ->
    console.log 'ReactApp start'

    i18n.init
      lng: 'ru'
      setJqueryExt: false
      resGetPath: TastySettings.localesPath + '/__lng__.json'
    , ->
      #render react page only when locale loaded
      ReactUjs.initialize()