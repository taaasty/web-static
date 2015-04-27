var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    config = require('../../config').desktop.html.static,
    reload = browserSync.reload;

gulp.task('[D] Html', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest))
    .pipe(reload({stream: true}));
});