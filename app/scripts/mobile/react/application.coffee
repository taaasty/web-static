Api      = require './api/api'
Polyglot = require 'node-polyglot'
ReactUjs = require 'reactUjs'

window.ReactApp =

  start: ->
    console.log 'ReactApp start'

    Api.locales.load TastySettings.locale
      .then (phrases) ->
        polyglot = new Polyglot
          locale:  TastySettings.locale
          phrases: phrases

        window.t = polyglot.t.bind polyglot

        ReactUjs.initialize()