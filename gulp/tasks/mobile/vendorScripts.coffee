browserify   = require 'browserify'
gulp         = require 'gulp'
source       = require 'vinyl-source-stream'
bundleLogger = require '../../util/bundleLogger'
handleErrors = require '../../util/handleErrors'
config       = require('../../config').mobile.local.scripts.vendor

gulp.task 'vendorMobileScripts', ->
  bundler = browserify({
    cache: {}, packageCache: {}
    basedir: config.baseDir
    extensions: config.extensions
  }).require '../../node_modules/react',         expose: 'react'
    .require '../scripts/shared/libs/react_ujs', expose: 'reactUjs'
    .require './eventEmitter/EventEmitter',      expose: 'eventEmitter'
    .require './reqwest/reqwest',                expose: 'reqwest'
    .require './i18next/i18next',                expose: 'i18next'

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