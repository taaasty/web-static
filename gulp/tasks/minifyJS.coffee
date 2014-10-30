# /*=====================================
# =            MinifyJS Task            =
# =====================================*/

gulp         = require 'gulp'
uglify       = require 'gulp-uglify'
rename       = require 'gulp-rename'
handleErrors = require '../util/handleErrors'
configBundle = require('../config').minifyJS.bundle
configStatic = require('../config').minifyJS.static

gulp.task 'minifyJS', ['scripts'], ->
  gulp.src configBundle.src
    .pipe uglify()
    .on 'error', handleErrors
    .pipe rename configBundle.outputName
    .pipe gulp.dest configBundle.dest

  gulp.src configStatic.src
    .pipe uglify()
    .on 'error', handleErrors
    .pipe rename configStatic.outputName
    .pipe gulp.dest configStatic.dest