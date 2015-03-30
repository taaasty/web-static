var gulp = require('gulp'),
    karma = require('karma').server,
    appRoot = require('app-root-path');

gulp.task('[M] Specs', function(done) {
  karma.start({
    configFile: appRoot + '/karma.conf.js'
  }, done);
});