browserify   = require 'browserify'
gulp         = require 'gulp'
source       = require 'vinyl-source-stream'
buffer       = require 'vinyl-buffer'
uglify       = require 'gulp-uglify'
rename       = require 'gulp-rename'
bundleLogger = require '../../../util/bundleLogger'
handleErrors = require '../../../util/handleErrors'
config       = require('../../../config').mobile.production.scripts

gulp.task '[M][P] Scripts', ->
  bundler = browserify({
    cache: {}, packageCache: {}
    basedir: config.bundle.baseDir
    entries: config.bundle.entries
    extensions: config.bundle.extensions
  }).require '../node_modules/react',                        expose: 'react'
    .require './scripts/shared/libs/react_ujs',              expose: 'reactUjs'
    .require './bower_components/eventEmitter/EventEmitter', expose: 'eventEmitter'
    .require './bower_components/reqwest/reqwest',           expose: 'reqwest'
    .require './bower_components/i18next/i18next',           expose: 'i18next'

  bundle = ->
    bundleLogger.start config.bundle.outputName

    return bundler
      .bundle()
      .on 'error', handleErrors
      .pipe source config.bundle.outputName
      .pipe gulp.dest config.bundle.dest
      .on 'end', ->
        bundleLogger.end config.bundle.outputName
        bundleLogger.start config.min.outputName
      .pipe buffer()
      .pipe uglify()
      .pipe rename config.min.outputName
      .pipe gulp.dest config.min.dest
      .on 'end', ->
        bundleLogger.end config.min.outputName

  return bundle()