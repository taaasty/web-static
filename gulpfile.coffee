gulp       = require 'gulp'
requireDir = require 'require-dir'

# Require all tasks in gulp/tasks, including subfolders
requireDir './gulp/tasks', { recurse: true }

gulp.task 'dist', ['scripts', 'staticScripts', 'styles', 'minifyJS', 'minifyCSS']
gulp.task 'build', ['vendorScripts', 'clientScripts', 'staticScripts', 'html', 'less']
gulp.task 'server', ['build', 'watch']