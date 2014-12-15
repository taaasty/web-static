ReactUjs = require 'reactUjs'

ReactApp =

  start: ({ user }) ->
    console.log 'ReactApp start'

    ReactUjs.initialize()

window.ReactApp = ReactApp