gulp        = require 'gulp'
browserSync = require 'browser-sync'
config      = require('../../config').mobile.local.html
reload      = browserSync.reload

gulp.task 'mobileHtml', ->
  gulp.src config.src
    .pipe gulp.dest config.dest
    .pipe reload({ stream: true })