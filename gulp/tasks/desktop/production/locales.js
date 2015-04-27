var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    config = require('../../../config').desktop.locales.production;

gulp.task('[D][P] Locales', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});