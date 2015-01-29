gulp        = require 'gulp'
browserSync = require 'browser-sync'
config      = require('../../config').locales

gulp.task 'locales', ->
  gulp.src config.src
    .pipe gulp.dest config.destDesktop
    .pipe gulp.dest config.destMobile