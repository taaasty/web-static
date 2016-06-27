import gulp from 'gulp';
import replace from 'gulp-replace';
import baseConfig from '../../../config';

const config = baseConfig.desktop.locales.static;

gulp.task('[D] tx:fix-en', () => {
  return gulp.src(config.srcPath + '/en.json')
    .pipe(replace(/^(\s*\"[^"]+)\_2(\"\:.*)$/m, '$1_plural$2'))
    .pipe(replace(/^\s*\"[^"]+\_5\"\:.*$\n/m, ''))
    .pipe(gulp.dest(config.srcPath));
});

gulp.task('[D] tx:fix', ['[D] tx:fix-en']);
