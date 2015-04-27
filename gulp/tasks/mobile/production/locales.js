var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    config = require('../../../config').mobile.locales.production;

gulp.task('[M][P] Locales', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});