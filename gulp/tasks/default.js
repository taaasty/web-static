var gulp = require('gulp');

gulp.task('default', ['[Shared] Clean'], function() {
  gulp.start('server');
});