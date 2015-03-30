var gulp = require('gulp'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify'),
    streamify = require('gulp-streamify'),
    rename = require('gulp-rename'),
    bundleLogger = require('../../util/bundleLogger'),
    handleErrors = require('../../util/handleErrors'),
    configLocal = require('../../config').mobile.local.scripts,
    configProduction = require('../../config').mobile.production.scripts;

// External dependencies we do not want to rebundle while developing,
// but include in our dist bundle
var dependencies = {
  react: './node_modules/react',
  lodash: './node_modules/lodash',
  reactUjs: './app/scripts/shared/libs/react_ujs',
  eventEmitter: './app/bower_components/eventEmitter/EventEmitter',
  reqwest: './app/bower_components/reqwest/reqwest',
  i18next: './app/bower_components/i18next/i18next',
  pusher: './app/bower_components/pusher/dist/pusher',
  jquery: './app/bower_components/jquery/dist/jquery'
};

gulp.task('[M][L] Scripts', function(cb) {

  /*==========  Client scripts  ==========*/

  var bundleQueue = 1;
  var clientBundler = browserify({
    cache: {}, packageCache: {},
    entries: configLocal.client.entries,
    extensions: configLocal.client.extensions
  });

  Object.keys(dependencies).forEach(function(key) {
    clientBundler.external(key);
  });

  var rebundle = function() {
    bundleLogger.start(configLocal.client.outputName);

    clientBundler.bundle()
      .on('error', handleErrors)
      .pipe( source(configLocal.client.outputName) )
      .pipe( gulp.dest(configLocal.client.dest) )
      .on('end', function() {
        bundleLogger.end(configLocal.client.outputName);
        bundleQueue--;
        if (bundleQueue === 0) { cb(); }
      });
  };

  clientBundler = watchify(clientBundler
    .transform('coffee-reactify')
    .transform('babelify')
  );
  clientBundler.on('update', rebundle);
  rebundle();

  /*==========  Vendor scripts  ==========*/

  var vendorBundler = browserify({
    cache: {}, packageCache: {},
    entries: configLocal.vendor.entries,
    extensions: configLocal.vendor.extensions
  });

  Object.keys(dependencies).forEach(function(key) {
    vendorBundler.require(dependencies[key], {expose: key});
  });

  bundleLogger.start(configLocal.vendor.outputName);

  vendorBundler
    .transform('browserify-shim')
    .transform('coffee-reactify')
    .bundle()
    .on('error', handleErrors)
    .pipe( source(configLocal.vendor.outputName) )
    .pipe( gulp.dest(configLocal.vendor.dest) )
    .on('end', function() {
      bundleLogger.end(configLocal.vendor.outputName);
    });
});

gulp.task('[M][P] Scripts', function() {

  /*==========  Bundle scripts  ==========*/

  var appBundler = browserify({
    cache: {}, packageCache: {},
    entries: configProduction.bundle.entries,
    extensions: configProduction.bundle.extensions
  });

  Object.keys(dependencies).forEach(function(key) {
    appBundler.require(dependencies[key], {expose: key});
  });

  bundleLogger.start(configProduction.bundle.outputName + ' & ' + configProduction.min.outputName);

  appBundler
    .transform('browserify-shim')
    .transform('babelify', {ignore: /(node_modules|bower_components)/})
    .transform('coffee-reactify')
    .bundle()
    .on('error', handleErrors)
    .pipe( source(configProduction.bundle.outputName) )
    .pipe( gulp.dest(configProduction.bundle.dest) )
    .pipe( streamify(uglify()) )
    .pipe( rename(configProduction.min.outputName) )
    .pipe( gulp.dest(configProduction.min.dest) )
    .on('end', function() {
      bundleLogger.end(configProduction.bundle.outputName + ' & ' + configProduction.min.outputName);
    });

  /*==========  Components scripts  ==========*/

  var componentsBundler = browserify({
    cache: {}, packageCache: {},
    entries: configProduction.components.entries,
    extensions: configProduction.components.extensions
  });

  Object.keys(dependencies).forEach(function(key) {
    componentsBundler.require(dependencies[key], {expose: key});
  });

  bundleLogger.start(configProduction.components.outputName);
  componentsBundler
    .transform('browserify-shim')
    .transform('babelify', {ignore: /(node_modules|bower_components)/})
    .transform('coffee-reactify')
    .bundle()
    .on('error', handleErrors)
    .pipe( source(configProduction.components.outputName) )
    .pipe( gulp.dest(configProduction.components.dest) )
    .on( 'end', function() {
      bundleLogger.end(configProduction.components.outputName);
    });
});