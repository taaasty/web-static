gulp        = require 'gulp'
browserSync = require 'browser-sync'
config      = require('../../../config').desktop.production.locales

gulp.task '[D][P] Locales', ->
  gulp.src config.src
    .pipe gulp.dest config.dest