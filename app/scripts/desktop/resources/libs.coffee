global._                 = require 'lodash'
global.$ = global.jQuery = require 'jquery'
global.MouseTrap         = require 'mousetrap'
global.React             = require 'react'
global.Dispatcher        = require('flux').Dispatcher
global.EventEmitter      = require 'eventEmitter'
global.bowser            = require 'bowser'
global.moment            = require '../../../bower_components/momentjs/moment'
global.Pusher            = require 'pusher'
global.Modernizr         = require 'Modernizr'
global.imagesLoaded      = require 'imagesloaded'
global.MediumEditor      = require 'medium-editor'
global.Undo              = require 'undo'
global.introJs           = require 'introJs'
require 'aviator'

require 'swfobject'
require 'es5-shim'
require('jquery.mousewheel')(global.jQuery)
require 'jquery.scrollto'

require 'baron'
require('react-mixin-manager')(global.React)
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
require 'jquery.select2'