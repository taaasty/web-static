Api      = require './api/api'
Polyglot = require 'node-polyglot'
ReactUjs = require 'reactUjs'

window.ReactApp =

  start: ->
    console.log 'ReactApp start'

    Api.locales.load TastySettings.localeLang
      .then (locale) ->
        polyglot = new Polyglot
          locale:  TastySettings.localeLang
          phrases: locale

        window.t = polyglot.t.bind polyglot

        ReactUjs.initialize()