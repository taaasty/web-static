gulp       = require 'gulp'
requireDir = require 'require-dir'

# Require all tasks in gulp/tasks, including subfolders
requireDir './gulp/tasks', { recurse: true }

gulp.task 'build', ['scripts', 'styles', 'minifyJS', 'minifyCSS']
gulp.task 'buildStatic', ['vendorScripts', 'clientScripts', 'html', 'less']
gulp.task 'server', ['buildStatic', 'watch']