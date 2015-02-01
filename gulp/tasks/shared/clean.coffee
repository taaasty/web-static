gulp   = require 'gulp'
del    = require 'del'
config = require('../../config').clean

gulp.task '[S] Clean', (cb) ->
  del config.dest, cb