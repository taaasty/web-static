_              = require 'lodash'
gulp           = require 'gulp'
browserify     = require 'browserify'
watchify       = require 'watchify'
coffeeReactify = require 'coffee-reactify'
source         = require 'vinyl-source-stream'
bundleLogger   = require '../../util/bundleLogger'
handleErrors   = require '../../util/handleErrors'
configClient   = require('../../config').mobile.local.scripts.client
configVendor   = require('../../config').mobile.local.scripts.vendor

gulp.task '[M][L] Scripts', ->
  # External dependencies you do not want to rebundle while developing,
  # but include in our dist bundle
  dependencies =
    react:        './node_modules/react'
    reactUjs:     './app/scripts/shared/libs/react_ujs'
    eventEmitter: './app/bower_components/eventEmitter/EventEmitter'
    reqwest:      './app/bower_components/reqwest/reqwest'
    i18next:      './app/bower_components/i18next/i18next'

  #==========  Client bundler  ==========#

  clientBundler = browserify
    # basedir: './'
    cache: {}, packageCache: {}
    entries: configClient.entries
    extensions: configClient.extensions

  clientBundler.transform coffeeReactify

  _.forEach dependencies, (path, dep) ->
    clientBundler.external dep

  rebundle = ->
    bundleLogger.start configClient.outputName

    clientBundler.bundle()
      .on 'error', handleErrors
      .pipe source(configClient.outputName)
      .pipe gulp.dest(configClient.dest)
      .on 'end', ->
        bundleLogger.end configClient.outputName

  clientBundler = watchify clientBundler
  clientBundler.on 'update', rebundle
  rebundle()

  #==========  Vendor bundler  ==========#

  vendorBundler = browserify
    cache: {}, packageCache: {}
    entries: configVendor.entries
    extensions: configVendor.extensions

  vendorBundler.transform coffeeReactify

  _.forEach dependencies, (path, dep) ->
    vendorBundler.require path, expose: dep

  bundleLogger.start configVendor.outputName

  vendorBundler.bundle()
    .on 'error', handleErrors
    .pipe source(configVendor.outputName)
    .pipe gulp.dest(configVendor.dest)
    .on 'end', ->
      bundleLogger.end configVendor.outputName