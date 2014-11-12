gulp = require 'gulp'

gulp.task 'watch', ['browserSync'], ->
  gulp.watch 'app/html/desktop/*.html', ['desktopHtml']
  gulp.watch 'app/html/mobile/*.html', ['mobileHtml']
  gulp.watch 'app/stylesheets/desktop/**/*.less', ['desktopLess']
  gulp.watch 'app/stylesheets/mobile/**/*.less', ['mobileLess']