var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    config = require('../../../config').mobile.locales.static;

gulp.task('[M][S] Locales', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});