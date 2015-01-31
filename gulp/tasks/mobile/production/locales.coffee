gulp        = require 'gulp'
browserSync = require 'browser-sync'
config      = require('../../../config').mobile.production.locales

gulp.task '[M][P] Locales', ->
  gulp.src config.src
    .pipe gulp.dest config.dest