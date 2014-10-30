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
configBundle = require('../config').dist.scripts.bundle
configStatic = require('../config').dist.scripts.static

gulp.task 'scripts', ['clean'], ->
  bundler = browserify({
    cache: {}, packageCache: {}
    basedir: configBundle.baseDir
    entries: configBundle.entries
    extensions: configBundle.extensions
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
    .require './bower_components/eventEmitter/EventEmitter',                { expose: 'eventEmitter' }
    .require './bower_components/pusher/dist/pusher',                       { expose: 'pusher' }
    .require './bower_components/i18next/i18next',                          { expose: 'i18next'}
    .require './bower_components/bootstrap/js/tooltip',                     { expose: 'bootstrap.tooltip' }
    .require './scripts/shims/modernizr',                                   { expose: 'Modernizr' }
    .require './scripts/shims/swf/swfobject',                               { expose: 'swfobject' }
    .require './bower_components/es5-shim/es5-shim',                        { expose: 'es5-shim' }
    .require './bower_components/jquery.mousewheel/jquery.mousewheel',      { expose: 'jquery.mousewheel' }
    .require './bower_components/jquery.scrollto/jquery.scrollTo',          { expose: 'jquery.scrollto' }
    .require './bower_components/undo/undo',                                { expose: 'undo' }
    .require './bower_components/medium-editor/dist/js/medium-editor',      { expose: 'medium-editor' }
    .require './scripts/resources/screen_viewer',                           { expose: 'screenviewer' }

  bundle = ->
    # Log when bundling starts
    bundleLogger.start configBundle.outputName

    return bundler
      .bundle()
      # Report compile errors
      .on 'error', handleErrors
      # Use vinyl-source-stream to make the
      # stream gulp compatible. Specifiy the
      # desired output filename here.
      .pipe source(configBundle.outputName)
      # Specify the output destination
      .pipe gulp.dest(configBundle.dest)
      .on 'end', ->
        bundleLogger.end configBundle.outputName

  if global.isWatching
    # Wrap with watchify and rebundle on changes
    bundler = watchify bundler
    # Rebundle on update
    bundler.on 'update', bundle

  return bundle()


# Bundle javascripty things with browserify!

browserify   = require 'browserify'
watchify     = require 'watchify'
bundleLogger = require '../util/bundleLogger'
gulp         = require 'gulp'
handleErrors = require '../util/handleErrors'
source       = require 'vinyl-source-stream'
config       = require('../config').dist.scripts

gulp.task 'staticScripts', ['clean'], ->
  bundler = browserify({
    basedir: configStatic.baseDir
    entries: configStatic.entries
    extensions: configStatic.extensions
  })
    .require './bower_components/jquery/dist/jquery', { expose: 'jquery' }
    .require './scripts/plugins/jquery.connection',   { expose: 'jquery.connection' }

  bundle = ->
    # Log when bundling starts
    bundleLogger.start configStatic.outputName

    return bundler
      .bundle()
      # Report compile errors
      .on 'error', handleErrors
      # Use vinyl-source-stream to make the
      # stream gulp compatible. Specifiy the
      # desired output filename here.
      .pipe source(configStatic.outputName)
      # Specify the output destination
      .pipe gulp.dest(configStatic.dest)
      .on 'end', ->
        bundleLogger.end configStatic.outputName

  return bundle()