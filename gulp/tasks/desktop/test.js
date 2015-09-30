import gulp from 'gulp';
import mochaPhantomjs from 'gulp-mocha-phantomjs';

gulp.task('[D] Test', () => (
  gulp.src('test/desktop/index.html').pipe(mochaPhantomjs({
    reporter: 'spec',
  }))
));

gulp.task('[D] Dist tests', ['[D][P] Test scripts'], () => (
  gulp.src('test/desktop/dist.html').pipe(mochaPhantomjs({
    reporter: 'spec',
  }))
    .on('error', () => process.exit(1))
));
