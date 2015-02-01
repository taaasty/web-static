browserSync = require 'browser-sync'
gulp        = require 'gulp'
config      = require('../../config').browserSync

gulp.task '[S] BrowserSync', ->
  browserSync config