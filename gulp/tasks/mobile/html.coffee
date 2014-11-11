# /*========================================
# =            Html mobile Task            =
# ========================================*/

gulp        = require 'gulp'
browserSync = require 'browser-sync'
config      = require('../../config').mobile.html
reload      = browserSync.reload

gulp.task 'htmlMobile', ->
  gulp.src config.src
    .pipe gulp.dest config.dest
    .pipe reload({ stream: true })