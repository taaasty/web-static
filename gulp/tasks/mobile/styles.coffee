# /*==========================================
# =            Styles mobile Task            =
# ==========================================*/

gulp         = require 'gulp'
less         = require 'gulp-less'
autoprefixer = require 'gulp-autoprefixer'
rename       = require 'gulp-rename'
handleErrors = require '../../util/handleErrors'
config       = require('../../config').mobile.dist.styles

gulp.task 'stylesMobile', ->
  gulp.src config.src
    .pipe less(
      paths: ['./app/mobile/bower_components/']
    )
    .on 'error', handleErrors
    .pipe autoprefixer('last 2 versions')
    .pipe rename config.outputName
    .pipe gulp.dest config.dest