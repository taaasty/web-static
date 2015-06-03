var gulp = require('gulp');

gulp.task('[S] Watch', ['[S] BrowserSync'], function() {
  gulp.watch('app/html/desktop/**/*.html', ['[D] Html']);
  gulp.watch('app/stylesheets/desktop/**/*.less', ['[D][S] Styles']);
  gulp.watch('app/scripts/desktop/locales/*.json', ['[D][S] Locales']);
  gulp.watch('app/html/mobile/**/*.html', ['[M] Html']);
  gulp.watch('app/stylesheets/mobile/**/*.less', ['[M][S] Styles']);
  gulp.watch('app/scripts/mobile/locales/*.json', ['[M][S] Locales']);
});