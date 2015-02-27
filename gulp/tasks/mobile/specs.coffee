gulp    = require 'gulp'
karma   = require('karma').server
appRoot = require 'app-root-path'

gulp.task '[M] Specs', (done) ->
  karma.start
    configFile: appRoot + '/karma.conf.js'
  , done