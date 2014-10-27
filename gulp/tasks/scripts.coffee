# /*=======================================
# =            Browserify task            =
# =======================================*/

# Bundle javascripty things with browserify!

browserify   = require 'browserify'
watchify     = require 'watchify'
bundleLogger = require '../util/bundleLogger'
gulp         = require 'gulp'
handleErrors = require '../util/handleErrors'
source       = require 'vinyl-source-stream'
config       = require('../config').dist.scripts

gulp.task 'scripts', ['clean'], ->
  bundler = browserify({
    cache: {}, packageCache: {}
    basedir: config.baseDir
    entries: config.entries
    extensions: config.extensions
  })
    .require './bower_components/jquery/dist/jquery',                       { expose: 'jquery' }
    .require './bower_components/jquery-ui/ui/core',                        { expose: 'jquery.ui.core' }
    .require './bower_components/jquery-ui/ui/slider',                      { expose: 'jquery.ui.slider' }
    .require './bower_components/jquery-ui/ui/draggable',                   { expose: 'jquery.ui.draggable' }
    .require './bower_components/jquery-ui/ui/mouse',                       { expose: 'jquery.ui.mouse' }
    .require './bower_components/jquery-ui/ui/widget',                      { expose: 'jquery.ui.widget' }
    .require './bower_components/jquery-autosize/jquery.autosize',          { expose: 'jquery.autosize' }
    .require './bower_components/jquery-waypoints/waypoints',               { expose: 'jquery.waypoints' }
    .require './scripts/plugins/jquery.autosize.input',                     { expose: 'jquery.autosize.input' }
    .require './scripts/plugins/jquery.collage',                            { expose: 'jquery.collage' }
    .require './bower_components/blueimp-file-upload/js/jquery.fileupload', { expose: 'jquery.fileupload' }
    .require './bower_components/jquery.shapeshift/core/jquery.shapeshift', { expose: 'jquery.shapeshift' }
    .require './bower_components/react/react-with-addons',                  { expose: 'react' }
    .require './bower_components/react-mixin-manager/react-mixin-manager',  { expose: 'react-mixin-manager' }
    .require './scripts/react/resources/react_ujs',                         { expose: 'reactUjs' }
    .require './bower_components/underscore/underscore',                    { expose: 'underscore' }
    .require './bower_components/backbone/backbone',                        { expose: 'backbone' }
    .require './bower_components/baron/baron',                              { expose: 'baron' }
    .require './bower_components/mousetrap/mousetrap',                      { expose: 'mousetrap' }
    .require './bower_components/bowser/bowser',                            { expose: 'bowser' }
    .require './bower_components/momentjs/moment',                          { expose: 'momentjs' }
    .require './bower_components/eventEmitter/EventEmitter',                { expose: 'eventEmitter' }
    .require './bower_components/pusher/dist/pusher',                       { expose: 'pusher' }
    .require './bower_components/i18next/i18next',                          { expose: 'i18next'}
    .require './bower_components/bootstrap/js/tooltip',                     { expose: 'bootstrap.tooltip' }
    .require './scripts/shims/modernizr',                                   { expose: 'Modernizr' }

  bundle = ->
    # Log when bundling starts
    bundleLogger.start config.outputName

    return bundler
      .bundle()
      # Report compile errors
      .on 'error', handleErrors
      # Use vinyl-source-stream to make the
      # stream gulp compatible. Specifiy the
      # desired output filename here.
      .pipe source(config.outputName)
      # Specify the output destination
      .pipe gulp.dest(config.dest)
      .on 'end', ->
        bundleLogger.end config.outputName

  if global.isWatching
    # Wrap with watchify and rebundle on changes
    bundler = watchify bundler
    # Rebundle on update
    bundler.on 'update', bundle

  return bundle()