var gulp = require('gulp'),
    handleErrors = require('../../util/handleErrors'),
    config = require('../../config').desktop.assets.static;

gulp.task('[D] Assets', function() {
  return gulp.src(config.src)
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest));
});