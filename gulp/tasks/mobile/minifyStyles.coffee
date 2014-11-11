# /*======================================
# =            MinifyCSS Task            =
# ======================================*/

gulp         = require 'gulp'
rename       = require 'gulp-rename'
minifyCss    = require 'gulp-minify-css'
handleErrors = require '../../util/handleErrors'
config       = require('../../config').mobile.production.styles.minify

gulp.task 'minifyMobileStyles', ['mobileStyles'], ->
  gulp.src config.src
    .pipe minifyCss()
    .on 'error', handleErrors
    .pipe rename config.outputName
    .pipe gulp.dest config.dest