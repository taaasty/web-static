gulp        = require 'gulp'
browserSync = require 'browser-sync'
config      = require('../../../config').mobile.local.locales

gulp.task '[M][L] Locales', ->
  gulp.src config.src
    .pipe gulp.dest config.dest