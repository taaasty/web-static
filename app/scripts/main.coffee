jQuery = require 'jquery'

window.React = require 'react'

require './old/tasty.api'
require './old/tasty'
require './old/tasty.utils'
require './old/fileReceiver'
require './old/popup'
require './old/design'
require './old/comments'
require './old/hero'
require './old/postEditor'
require './old/shellbox'
require './old/messages'
require './old/editableField'

require './utils/routes'
require './react_components/follow_button'
require 'react_ujs'

App = require './app'

App.start()

console.log 'main started'
