var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    handleErrors = require('../../../util/handleErrors'),
    config = require('../../../config').desktop.styles.static;

gulp.task('[D][S] Styles', function() {
  return gulp.src(config.src)
    .pipe(less({paths: ['./app/bower_components/']}))
    .on('error', handleErrors)
    .pipe(autoprefixer('last 2 versions'))
    .pipe(rename(config.outputName))
    .pipe(gulp.dest(config.dest));
});