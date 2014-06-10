jQuery = require 'jquery'

window.React = require 'react'

require './utils/routes'
require './react_components/follow_button'
require 'react_ujs'

App = require './app'

App.start()

console.log 'main started'
