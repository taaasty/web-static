_                = require 'lodash'
gulp             = require 'gulp'
browserify       = require 'browserify'
watchify         = require 'watchify'
coffeeReactify   = require 'coffee-reactify'
source           = require 'vinyl-source-stream'
uglify           = require 'gulp-uglify'
streamify        = require 'gulp-streamify'
rename           = require 'gulp-rename'
bundleLogger     = require '../../util/bundleLogger'
handleErrors     = require '../../util/handleErrors'
configClient     = require('../../config').mobile.local.scripts.client
configVendor     = require('../../config').mobile.local.scripts.vendor
configProduction = require('../../config').mobile.production.scripts
configComponents = require('../../config').mobile.production.scripts.components

# External dependencies we do not want to rebundle while developing,
# but include in our dist bundle
dependencies =
  react:        './node_modules/react'
  lodash:       './node_modules/lodash'
  reactUjs:     './app/scripts/shared/libs/react_ujs'
  eventEmitter: './app/bower_components/eventEmitter/EventEmitter'
  reqwest:      './app/bower_components/reqwest/reqwest'
  i18next:      './app/bower_components/i18next/i18next'

gulp.task '[M][L] Scripts', ->
  #==========  Client bundler  ==========#

  clientBundler = browserify
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

gulp.task '[M][P] Scripts', ->
  #==========  App bundler  ==========#

  appBundler = browserify
    cache: {}, packageCache: {}
    entries: configProduction.bundle.entries
    extensions: configProduction.bundle.extensions

  appBundler.transform coffeeReactify

  _.forEach dependencies, (path, dep) ->
    appBundler.require path, expose: dep

  bundleLogger.start "#{configProduction.bundle.outputName} & #{configProduction.min.outputName}"
  appBundler.bundle()
    .on 'error', handleErrors
    .pipe source(configProduction.bundle.outputName)
    .pipe gulp.dest(configProduction.bundle.dest)
    .pipe streamify(uglify())
    .pipe rename(configProduction.min.outputName)
    .pipe gulp.dest(configProduction.min.dest)
    .on 'end', ->
      bundleLogger.end "#{configProduction.bundle.outputName} & #{configProduction.min.outputName}"

  #==========  Components bundler  ==========#

  componentsBundler = browserify
    cache: {}, packageCache: {}
    entries: configComponents.entries
    extensions: configComponents.extensions

  componentsBundler.transform coffeeReactify

  _.forEach dependencies, (path, dep) ->
    componentsBundler.require path, expose: dep

  bundleLogger.start configComponents.outputName
  componentsBundler.bundle()
    .on 'error', handleErrors
    .pipe source(configComponents.outputName)
    .pipe gulp.dest(configComponents.dest)
    .on 'end', ->
      bundleLogger.end configComponents.outputName