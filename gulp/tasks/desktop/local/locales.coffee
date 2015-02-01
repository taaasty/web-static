gulp        = require 'gulp'
browserSync = require 'browser-sync'
config      = require('../../../config').desktop.local.locales

gulp.task '[D][L] Locales', ->
  gulp.src config.src
    .pipe gulp.dest config.dest