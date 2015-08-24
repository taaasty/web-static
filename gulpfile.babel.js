import gulp from 'gulp';
import requireDir from 'require-dir';
import runSequence from 'run-sequence';

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', { recurse: true });

gulp.task('dist', ['[D] Test with build', '[M] Test with build'], (cb) => {
  runSequence(
    ['[S] Clean'],
    ['[D][P] Scripts', '[D][P] Styles', '[D][P] Locales', '[D][D] Scripts'],
    ['[M][P] Scripts', '[M][P] Styles', '[M][P] Locales', '[M][D] Scripts'],
  cb);
});

gulp.task('build', ['[S] Clean'], (cb) => {
  runSequence(['buildDesktop', 'buildMobile'], cb);
});

gulp.task('buildDesktop', ['[S] Clean'], (cb) => {
  runSequence([
    '[D][S] Client scripts',
    '[D][S] Vendor scripts',
    '[D][S] Test scripts',
    '[D][S] Locales',
    '[D][S] Styles',
    '[D] Assets',
    '[D] Html'
  ], cb);
});

gulp.task('buildMobile', ['[S] Clean'], (cb) => {
  runSequence([
    '[M][S] Client scripts',
    '[M][S] Vendor scripts',
    '[M][S] Test scripts',
    '[M][S] Locales',
    '[M][S] Styles',
    '[M] Html',
  ], cb);
});

gulp.task('server', ['[S] SetWatch', 'build'], () => {
  gulp.start('[S] Watch');
});

gulp.task('default', ['server']);