# /*=================================
# =            Html Task            =
# =================================*/

gulp        = require 'gulp'
browserSync = require 'browser-sync'
config      = require('../config').html
reload      = browserSync.reload

gulp.task 'html', ->
  gulp.src config.src
    .pipe gulp.dest config.dest
    .pipe reload({ stream: true })