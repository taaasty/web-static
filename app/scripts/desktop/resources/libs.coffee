window._                 = require 'underscore'
window.$ = window.jQuery = require 'jquery'
window.MouseTrap         = require 'mousetrap'
window.React             = require 'react'
window.Dispatcher        = require('flux').Dispatcher
window.EventEmitter      = require 'eventEmitter'
window.bowser            = require 'bowser'
window.moment            = require '../../../bower_components/momentjs/moment'
window.Pusher            = require 'pusher'
window.Modernizr         = require 'Modernizr'
window.imagesLoaded      = require 'imagesloaded'
window.MediumEditor      = require 'medium-editor'
window.Undo              = require 'undo'
window.introJs           = require 'introJs'
require 'aviator'

require 'swfobject'
require 'es5-shim'
require('jquery.mousewheel')(window.jQuery)
require 'jquery.scrollto'
require 'screenviewer'

require 'baron'
require('react-mixin-manager')(window.React)
require 'bootstrap.tooltip'

# jQuery UI components
require 'jquery.ui.core'
require 'jquery.ui.widget'
require 'jquery.ui.mouse'
require 'jquery.ui.slider'
require 'jquery.ui.draggable'

# jQuery plugins
require 'jquery.autosize'
require 'jquery.autosize.input'
require 'jquery.collage'
require 'jquery.waypoints'
require 'jquery.fileupload'
require 'jquery.shapeshift'