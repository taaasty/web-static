# /*==================================
# =            Watch Task            =
# ==================================*/

# Notes:
# - gulp/tasks/browserify.coffee handles js recompiling with watchify
# - gulp/tasks/browserSync.coffee watches and reloads compiled files

gulp   = require 'gulp'
config = require '../config'

gulp.task 'watch', ['setWatch', 'browserSync'], ->
  gulp.watch 'app/*.html', ['html']
  gulp.watch 'app/stylesheets/**/*.less', ['less']