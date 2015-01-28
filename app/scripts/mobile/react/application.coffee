Api            = require './api/api'
ReactUjs       = require 'reactUjs'
window.Phrases = {}

window.ReactApp =

  start: (locale = TastySettings.locale) ->
    console.log 'ReactApp start'

    Api.locales.load locale
      .then (phrases) ->
        Phrases[locale] = phrases
        ReactUjs.initialize()