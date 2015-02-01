gulp         = require 'gulp'
less         = require 'gulp-less'
autoprefixer = require 'gulp-autoprefixer'
rename       = require 'gulp-rename'
minifyCss    = require 'gulp-minify-css'
handleErrors = require '../../../util/handleErrors'
config       = require('../../../config').desktop.production.styles

gulp.task '[D][P] Styles', ->
  gulp.src config.bundle.src
    .pipe less(
      paths: ['./app/bower_components/']
    )
    .on 'error', handleErrors
    .pipe autoprefixer 'last 2 versions'
    .pipe rename config.bundle.outputName
    .pipe gulp.dest config.bundle.dest
    .pipe minifyCss()
    .pipe rename config.min.outputName
    .pipe gulp.dest config.min.dest