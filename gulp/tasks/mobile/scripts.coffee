browserify   = require 'browserify'
gulp         = require 'gulp'
source       = require 'vinyl-source-stream'
bundleLogger = require '../../util/bundleLogger'
handleErrors = require '../../util/handleErrors'
config       = require('../../config').mobile.production.scripts.bundle

gulp.task 'mobileScripts', ->
  bundler = browserify({
    cache: {}, packageCache: {}
    basedir: config.baseDir
    entries: config.entries
    extensions: config.extensions
  }).require '../node_modules/react',                        expose: 'react'
    .require '../node_modules/react/lib/cx',                 expose: 'react/lib/cx'
    .require './scripts/shared/libs/react_ujs',              expose: 'reactUjs'
    .require './bower_components/eventEmitter/EventEmitter', expose: 'eventEmitter'

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