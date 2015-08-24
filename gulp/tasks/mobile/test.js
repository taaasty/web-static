import gulp from 'gulp';
import mochaPhantomjs from 'gulp-mocha-phantomjs';

gulp.task('[M] Test', () => (
  gulp.src('test/mobile/index.html').pipe(mochaPhantomjs({
    reporter: 'spec'
  }))
));

gulp.task('[M] Test with build', ['[M][S] Vendor scripts', '[M][S] Test scripts'], () => (
  gulp.src('test/mobile/index.html').pipe(mochaPhantomjs({
    reporter: 'spec'
  }))
));