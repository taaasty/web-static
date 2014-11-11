# /*============================================
# =            MinifyJS mobile Task            =
# ============================================*/

gulp         = require 'gulp'
uglify       = require 'gulp-uglify'
rename       = require 'gulp-rename'
handleErrors = require '../../util/handleErrors'
config       = require('../../config').mobile.minifyJS

gulp.task 'minifyJSMobile', ['scriptsMobile'], ->
  gulp.src config.src
    .pipe uglify()
    .on 'error', handleErrors
    .pipe rename config.outputName
    .pipe gulp.dest config.dest