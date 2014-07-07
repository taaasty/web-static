jQuery = require 'jquery'
window.MouseTrap = require 'mousetrap'
window.React = require 'react/addons'
window.ReactUjs = require 'react_ujs'
window._ = require 'underscore'
window.moment = require 'momentjs'

require 'momentjs/lang/ru'
require 'blueimp-file-upload/js/jquery.fileupload'

# Именно так, иначе он реквайрит не то что надо
Cortex = require 'cortexjs/build/cortex.min.js'