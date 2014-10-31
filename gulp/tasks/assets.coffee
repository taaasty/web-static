# /*===================================
# =            Assets Task            =
# ===================================*/

gulp         = require 'gulp'
handleErrors = require '../util/handleErrors'
config       = require('../config').assets

gulp.task 'assets', ['clean'], ->
  gulp.src config.src
    .on 'error', handleErrors
    .pipe gulp.dest config.dest