gulp        = require 'gulp'
requireDir  = require 'require-dir'
runSequence = require 'run-sequence'

# Require all tasks in gulp/tasks, including subfolders
requireDir './gulp/tasks', { recurse: true }

gulp.task 'dist', ['clean'], ->
  gulp.start 'minifyDesktopScripts', 'minifyDesktopStyles', 'minifyMobileScripts', 'minifyMobileStyles', 'mobileComponentsScripts'

gulp.task 'build', ['clean'], (cb) ->
  runSequence ['buildDesktop', 'buildMobile'], cb

gulp.task 'buildDesktop', ['clean'], (cb) ->
  runSequence ['vendorDesktopScripts', 'clientDesktopScripts', 'desktopLess', 'desktopHtml', 'assets'], cb

gulp.task 'buildMobile', ['clean'], (cb) ->
  runSequence ['vendorMobileScripts', 'clientMobileScripts', 'mobileLess', 'mobileHtml'], cb

gulp.task 'server', ['setWatch', 'build'], ->
  gulp.start 'watch'