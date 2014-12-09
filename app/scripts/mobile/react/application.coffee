ReactUjs = require 'reactUjs'
console.log ReactUjs
ReactApp =

  start: ({ user }) ->
    console.log 'ReactApp start'

    ReactUjs.initialize()

window.ReactApp = ReactApp