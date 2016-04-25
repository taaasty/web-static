import gulp from 'gulp';
import less from 'gulp-less';
import autoprefixer from 'gulp-autoprefixer';
import cleanCss from 'gulp-clean-css';
import rename from 'gulp-rename';
import handleErrors from '../../../util/handleErrors';
import config from '../../../config';

const { dest, outputName, src } = config.mobile.styles.production;

gulp.task('[M][P] Styles', function() {
  return gulp.src(src)
    .pipe(less({paths: ['./app/bower_components/', './node_modules/']}))
    .on('error', handleErrors)
    .pipe(autoprefixer('last 2 versions'))
    .pipe(cleanCss())
    .pipe(rename(outputName))
    .pipe(gulp.dest(dest));
});
