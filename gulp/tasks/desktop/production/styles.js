var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    handleErrors = require('../../../util/handleErrors'),
    config = require('../../../config').desktop.styles.production;

gulp.task('[D][P] Styles', function() {
  return gulp.src(config.src)
    .pipe(less({paths: ['./app/bower_components/']}))
    .on('error', handleErrors)
    .pipe(autoprefixer('last 2 versions'))
    .pipe(minifyCss())
    .pipe(rename(config.outputName))
    .pipe(gulp.dest(config.dest));
});