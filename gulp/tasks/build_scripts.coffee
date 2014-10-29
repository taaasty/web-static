# /*==========================================
# =            Build Scripts Task            =
# ==========================================*/

browserify     = require 'browserify'
watchify       = require 'watchify'
gulp           = require 'gulp'
source         = require 'vinyl-source-stream'
bundleLogger   = require '../util/bundleLogger'
handleErrors   = require '../util/handleErrors'
vendorConfig   = require('../config').vendor
clientConfig   = require('../config').client

gulp.task 'vendorScripts', ['clean'], ->
  bundler = browserify({
    cache: {}, packageCache: {}
    basedir: vendorConfig.baseDir
    extensions: vendorConfig.extensions
  }).require './jquery/dist/jquery',                       { expose: 'jquery' }
    .require './jquery-ui/ui/core',                        { expose: 'jquery.ui.core' }
    .require './jquery-ui/ui/slider',                      { expose: 'jquery.ui.slider' }
    .require './jquery-ui/ui/draggable',                   { expose: 'jquery.ui.draggable' }
    .require './jquery-ui/ui/mouse',                       { expose: 'jquery.ui.mouse' }
    .require './jquery-ui/ui/widget',                      { expose: 'jquery.ui.widget' }
    .require './jquery-autosize/jquery.autosize',          { expose: 'jquery.autosize' }
    .require './jquery-waypoints/waypoints',               { expose: 'jquery.waypoints' }
    .require '../scripts/plugins/jquery.autosize.input',   { expose: 'jquery.autosize.input' }
    .require '../scripts/plugins/jquery.collage',          { expose: 'jquery.collage' }
    .require './blueimp-file-upload/js/jquery.fileupload', { expose: 'jquery.fileupload' }
    .require './jquery.shapeshift/core/jquery.shapeshift', { expose: 'jquery.shapeshift' }
    .require './react/react-with-addons',                  { expose: 'react' }
    .require './react-mixin-manager/react-mixin-manager',  { expose: 'react-mixin-manager' }
    .require '../scripts/react/resources/react_ujs',       { expose: 'reactUjs' }
    .require './underscore/underscore',                    { expose: 'underscore' }
    .require './backbone/backbone',                        { expose: 'backbone' }
    .require './baron/baron',                              { expose: 'baron' }
    .require './mousetrap/mousetrap',                      { expose: 'mousetrap' }
    .require './bowser/bowser',                            { expose: 'bowser' }
    .require './momentjs/moment',                          { expose: 'momentjs' }
    .require '../scripts/react/resources/momentjs/ru',     { expose: 'momentjsRU' }
    .require './eventEmitter/EventEmitter',                { expose: 'eventEmitter' }
    .require './pusher/dist/pusher',                       { expose: 'pusher' }
    .require './i18next/i18next',                          { expose: 'i18next'}
    .require './bootstrap/js/tooltip',                     { expose: 'bootstrap.tooltip' }
    .require '../scripts/shims/modernizr',                 { expose: 'Modernizr' }
    .require '../scripts/shims/swf/swfobject',             { expose: 'swfobject' }
    .require './es5-shim/es5-shim',                        { expose: 'es5-shim' }
    .require './jquery.mousewheel/jquery.mousewheel',      { expose: 'jquery.mousewheel' }
    .require './jquery.scrollto/jquery.scrollTo',          { expose: 'jquery.scrollto' }
    .require './undo/undo',                                { expose: 'undo' }
    .require './medium-editor/dist/js/medium-editor',      { expose: 'medium-editor' }
    .require '../scripts/resources/screen_viewer',         { expose: 'screenviewer' }

  bundle = ->
    bundleLogger.start vendorConfig.outputName

    return bundler
             .bundle()
             .on 'error', handleErrors
             .pipe source(vendorConfig.outputName)
             .pipe gulp.dest(vendorConfig.dest)
             .on 'end', ->
               bundleLogger.end vendorConfig.outputName

  if global.isWatching
    bundler = watchify bundler
    bundler.on 'update', bundle

  return bundle()

gulp.task 'clientScripts', ['clean'], ->
  bundler = browserify({
    cache: {}, packageCache: {}
    entries: clientConfig.entries
    extensions: clientConfig.extensions
  }).external 'jquery'
    .external 'jquery.ui.core'
    .external 'jquery.ui.slider'
    .external 'jquery.ui.draggable'
    .external 'jquery.ui.mouse'
    .external 'jquery.ui.widget'
    .external 'jquery.autosize'
    .external 'jquery.autosize.input'
    .external 'jquery.collage'
    .external 'jquery.waypoints'
    .external 'jquery.fileupload'
    .external 'jquery.shapeshift'
    .external 'react'
    .external 'react-mixin-manager'
    .external 'reactUjs'
    .external 'underscore'
    .external 'backbone'
    .external 'baron'
    .external 'mousetrap'
    .external 'bowser'
    .external 'momentjs'
    .external 'momentjsRU'
    .external 'eventEmitter'
    .external 'pusher'
    .external 'i18next'
    .external 'bootstrap.tooltip'
    .external 'Modernizr'
    .external 'swfobject'
    .external 'es5-shim'
    .external 'jquery.mousewheel'
    .external 'jquery.scrollto'
    .external 'undo'
    .external 'medium-editor'
    .external 'screenviewer'

  bundle = ->
    bundleLogger.start clientConfig.outputName

    return bundler
             .bundle()
             .on 'error', handleErrors
             .pipe source(clientConfig.outputName)
             .pipe gulp.dest(clientConfig.dest)
             .on 'end', ->
               bundleLogger.end clientConfig.outputName

  if global.isWatching
    bundler = watchify bundler
    bundler.on 'update', bundle

  return bundle()