import gulp from 'gulp';
import mochaPhantomjs from 'gulp-mocha-phantomjs';

gulp.task('[D] Test', () => (
  gulp.src('test/desktop/index.html').pipe(mochaPhantomjs({
    reporter: 'spec'
  }))
));

gulp.task('[D] Test with build', ['[D][S] Vendor scripts', '[D][S] Test scripts'], () => (
  gulp.src('test/desktop/index.html').pipe(mochaPhantomjs({
    reporter: 'spec'
  }))
));