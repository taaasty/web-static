# /*=================================================
# =            Build Mobile scripts Task            =
# ==========================================*/

browserify     = require 'browserify'
watchify       = require 'watchify'
gulp           = require 'gulp'
source         = require 'vinyl-source-stream'
bundleLogger   = require '../../util/bundleLogger'
handleErrors   = require '../../util/handleErrors'
vendorConfig   = require('../../config').mobile.vendor
clientConfig   = require('../../config').mobile.client

gulp.task 'vendorMobileScripts', ->
  bundler = browserify({
    cache: {}, packageCache: {}
    basedir: vendorConfig.baseDir
    extensions: vendorConfig.extensions
  })

  bundle = ->
    bundleLogger.start vendorConfig.outputName

    return bundler
             .bundle()
             .on 'error', handleErrors
             .pipe source(vendorConfig.outputName)
             .pipe gulp.dest(vendorConfig.dest)
             .on 'end', ->
               bundleLogger.end vendorConfig.outputName

  return bundle()

gulp.task 'clientMobileScripts', ->
  bundler = browserify({
    cache: {}, packageCache: {}
    entries: clientConfig.entries
    extensions: clientConfig.extensions
  })

  bundle = ->
    bundleLogger.start clientConfig.outputName

    return bundler
             .bundle()
             .on 'error', handleErrors
             .pipe source(clientConfig.outputName)
             .pipe gulp.dest(clientConfig.dest)
             .on 'end', ->
               bundleLogger.end clientConfig.outputName

  bundler = watchify bundler
  bundler.on 'update', bundle

  return bundle()