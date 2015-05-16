var gulp = require('gulp');

gulp.task('default', ['[S] Clean'], function() {
  gulp.start('server');
});