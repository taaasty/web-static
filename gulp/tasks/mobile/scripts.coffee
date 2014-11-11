# /*==============================================
# =            Browserify mobile task            =
# ==============================================*/

browserify   = require 'browserify'
watchify     = require 'watchify'
gulp         = require 'gulp'
source       = require 'vinyl-source-stream'
bundleLogger = require '../../util/bundleLogger'
handleErrors = require '../../util/handleErrors'
config       = require('../../config').mobile.dist.scripts

gulp.task 'scriptsMobile', ->
  bundler = browserify({
    cache: {}, packageCache: {}
    basedir: config.baseDir
    entries: config.entries
    extensions: config.extensions
  })

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