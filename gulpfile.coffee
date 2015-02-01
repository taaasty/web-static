gulp        = require 'gulp'
requireDir  = require 'require-dir'
runSequence = require 'run-sequence'

# Require all tasks in gulp/tasks, including subfolders
requireDir './gulp/tasks', recurse: true

gulp.task 'dist', ['[S] Clean'], ->
  gulp.start '[D][P] Scripts', '[D][P] Styles', '[D][P] Locales',
             '[M][P] Scripts', '[M][P] Styles', '[M][P] Locales', '[M] ComponentsScripts'

gulp.task 'build', ['[S] Clean'], (cb) ->
  runSequence ['buildDesktop', 'buildMobile'], cb

gulp.task 'buildDesktop', ['[S] Clean'], (cb) ->
  runSequence [
    '[D] VendorScripts', '[D] ClientScripts', '[D][L] Styles', '[D] Html', '[D] Assets'
    '[D][L] Locales'
  ], cb

gulp.task 'buildMobile', ['[S] Clean'], (cb) ->
  runSequence [
    '[M] VendorScripts', '[M] ClientScripts', '[M][L] Styles', '[M] Html', '[M][L] Locales'
  ], cb

gulp.task 'server', ['[S] SetWatch', 'build'], ->
  gulp.start '[S] Watch'