var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    config = require('../../../config').desktop.locales.static;

gulp.task('[D][S] Locales', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});