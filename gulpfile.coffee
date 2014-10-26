gulp       = require 'gulp'
requireDir = require 'require-dir'

# Require all tasks in gulp/tasks, including subfolders
requireDir './gulp/tasks', { recurse: true }

# gulp.task 'build', ['browserify', 'html', 'less', 'minifyJS', 'minifyCSS']
gulp.task 'buildStatic', ['vendorScripts', 'clientScripts', 'html', 'less']
gulp.task 'server', ['buildStatic', 'watch']