gulp        = require 'gulp'
requireDir  = require 'require-dir'
runSequence = require 'run-sequence'

# Require all tasks in gulp/tasks, including subfolders
requireDir './gulp/tasks', { recurse: true }

gulp.task 'dist', ['clean'], ->
  gulp.start 'minifyDesktopScripts', 'minifyDesktopStyles', 'minifyMobileScripts', 'minifyMobileStyles'

gulp.task 'buildDesktop', ['clean'], (cb) ->
  runSequence ['vendorDesktopScripts', 'clientDesktopScripts', 'desktopLess', 'desktopHtml', 'assets'], cb

gulp.task 'buildMobile', ['clean'], (cb) ->
  runSequence ['vendorMobileScripts', 'clientMobileScripts', 'mobileLess', 'mobileHtml'], cb

# gulp.task 'buildMobile', ['vendorMobileScripts', 'clientMobileScripts', 'htmlMobile', 'lessMobile']
gulp.task 'server', ['buildDesktop', 'buildMobile'], ->
  gulp.start 'watch'