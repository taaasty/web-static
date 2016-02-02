import gulp from 'gulp';
import ghPages from 'gulp-gh-pages';
const config = require('../../config').ghPages;

gulp.task('[S] GithubPages', function() {
  return gulp.src(config.src)
    .pipe(ghPages(config.options));
});