browserify     = require 'browserify'
gulp           = require 'gulp'
source         = require 'vinyl-source-stream'
bundleLogger   = require '../../util/bundleLogger'
handleErrors   = require '../../util/handleErrors'
config         = require('../../config').desktop.local.scripts.vendor

gulp.task 'vendorDesktopScripts', ->
  bundler = browserify({
    cache: {}, packageCache: {}
    basedir: config.baseDir
    extensions: config.extensions
  }).require './jquery/dist/jquery',                             expose: 'jquery'
    .require './jquery-ui/ui/core',                              expose: 'jquery.ui.core'
    .require './jquery-ui/ui/slider',                            expose: 'jquery.ui.slider'
    .require './jquery-ui/ui/draggable',                         expose: 'jquery.ui.draggable'
    .require './jquery-ui/ui/mouse',                             expose: 'jquery.ui.mouse'
    .require './jquery-ui/ui/widget',                            expose: 'jquery.ui.widget'
    .require './jquery-autosize/jquery.autosize',                expose: 'jquery.autosize'
    .require './jquery-waypoints/waypoints',                     expose: 'jquery.waypoints'
    .require '../scripts/desktop/plugins/jquery.autosize.input', expose: 'jquery.autosize.input'
    .require '../scripts/desktop/plugins/jquery.collage',        expose: 'jquery.collage'
    .require './blueimp-file-upload/js/jquery.fileupload',       expose: 'jquery.fileupload'
    .require './jquery.shapeshift/core/jquery.shapeshift',       expose: 'jquery.shapeshift'
    .require '../../node_modules/react',                         expose: 'react'
    .require './react-mixin-manager/react-mixin-manager',        expose: 'react-mixin-manager'
    .require '../scripts/shared/libs/react_ujs',                 expose: 'reactUjs'
    .require './underscore/underscore',                          expose: 'underscore'
    .require './baron/baron',                                    expose: 'baron'
    .require './mousetrap/mousetrap',                            expose: 'mousetrap'
    .require './bowser/bowser',                                  expose: 'bowser'
    .require './eventEmitter/EventEmitter',                      expose: 'eventEmitter'
    .require './pusher/dist/pusher',                             expose: 'pusher'
    .require './i18next/i18next',                                expose: 'i18next'
    .require './bootstrap/js/tooltip',                           expose: 'bootstrap.tooltip'
    .require '../scripts/desktop/shims/modernizr',               expose: 'Modernizr'
    .require '../scripts/desktop/shims/swf/swfobject',           expose: 'swfobject'
    .require './intro.js/intro',                                 expose: 'introJs'
    .require './es5-shim/es5-shim',                              expose: 'es5-shim'
    .require './jquery.mousewheel/jquery.mousewheel',            expose: 'jquery.mousewheel'
    .require './jquery.scrollto/jquery.scrollTo',                expose: 'jquery.scrollto'
    .require './undo/undo',                                      expose: 'undo'
    .require './medium-editor/dist/js/medium-editor',            expose: 'medium-editor'
    .require '../scripts/desktop/resources/screen_viewer',       expose: 'screenviewer'
    .require './aviator/src/main',                               expose: 'aviator'
    .require './nanobar/index',                                  expose: 'nanobar'

  bundle = ->
    bundleLogger.start config.outputName

    return bundler
             .bundle()
             .on 'error', handleErrors
             .pipe source(config.outputName)
             .pipe gulp.dest(config.dest)
             .on 'end', ->
               bundleLogger.end config.outputName

  return bundle()