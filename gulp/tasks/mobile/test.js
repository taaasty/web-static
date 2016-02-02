import gulp from 'gulp';
import mochaPhantomjs from 'gulp-mocha-phantomjs';

gulp.task('[M] Test', () => (
  gulp.src('test/mobile/index.html').pipe(mochaPhantomjs({
    reporter: 'spec',
  }))
));

gulp.task('[M] Dist tests', ['[M][P] Test scripts'], () => (
  gulp.src('test/mobile/dist.html').pipe(mochaPhantomjs({
    reporter: 'spec',
  }))
    .on('error', () => process.exit(1))
));
