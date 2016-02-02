var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    config = require('../../config').browserSync;

gulp.task('[S] BrowserSync', function() {
  browserSync(config);
});