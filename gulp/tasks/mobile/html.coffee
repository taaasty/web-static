gulp        = require 'gulp'
browserSync = require 'browser-sync'
config      = require('../../config').mobile.local.html
reload      = browserSync.reload

gulp.task '[M] Html', ->
  gulp.src config.src
    .pipe gulp.dest config.dest
    .pipe reload({ stream: true })