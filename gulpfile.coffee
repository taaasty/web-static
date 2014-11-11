gulp        = require 'gulp'
requireDir  = require 'require-dir'
runSequence = require 'run-sequence'

# Require all tasks in gulp/tasks, including subfolders
requireDir './gulp/tasks', { recurse: true }

gulp.task 'dist', ['minifyJS', 'minifyJSMobile', 'minifyCSS', 'minifyCSSMobile', 'staticScripts', 'assets']

gulp.task 'build', ['clean'], (cb) ->
  runSequence ['vendorScripts', 'clientScripts', 'staticScripts', 'assets', 'html', 'less'], cb

gulp.task 'buildMobile', ['clean'], (cb) ->
  runSequence ['vendorMobileScripts', 'clientMobileScripts', 'htmlMobile', 'lessMobile'], cb

# gulp.task 'build',       ['vendorScripts', 'clientScripts', 'staticScripts', 'assets', 'html', 'less']
# gulp.task 'buildMobile', ['vendorMobileScripts', 'clientMobileScripts', 'htmlMobile', 'lessMobile']
gulp.task 'server', ['build', 'buildMobile'], ->
  gulp.start 'watch'




# gulp.task 'dist', ['clean'], ->
#   gulp.start 'scripts', 'styles', 'minifyScripts', 'minifyStyles'

# gulp.task 'build', ['clean'], (cb) ->
#   runSequence ['vendorScripts', 'localScripts', 'html', 'haml', 'sass', 'fonts', 'images'], cb

# gulp.task 'server', ['build'], ->
#   gulp.start 'watch'