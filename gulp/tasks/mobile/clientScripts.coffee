browserify   = require 'browserify'
gulp         = require 'gulp'
watchify     = require 'watchify'
source       = require 'vinyl-source-stream'
bundleLogger = require '../../util/bundleLogger'
handleErrors = require '../../util/handleErrors'
config       = require('../../config').mobile.local.scripts.client

gulp.task 'clientMobileScripts', ->
  bundler = browserify({
    cache: {}, packageCache: {}
    entries: config.entries
    extensions: config.extensions
  }).external 'react'
    .external 'reactUjs'
    .external 'eventEmitter'
    .external 'reqwest'

  bundle = ->
    bundleLogger.start config.outputName

    return bundler
             .bundle()
             .on 'error', handleErrors
             .pipe source(config.outputName)
             .pipe gulp.dest(config.dest)
             .on 'end', ->
               bundleLogger.end config.outputName

  if global.isWatching
    bundler = watchify bundler
    bundler.on 'update', bundle

  return bundle()