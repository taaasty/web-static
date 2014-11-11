gulp = require 'gulp'

gulp.task 'watch', ['browserSync'], ->
  gulp.watch 'app/*.html', ['desktopHtml']
  gulp.watch 'app/html/mobile/*.html', ['mobileHtml']
  gulp.watch 'app/stylesheets/**/*.less', ['desktopLess']
  gulp.watch 'app/stylesheets/mobile/**/*.less', ['mobileLess']