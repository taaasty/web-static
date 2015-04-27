var gulp = require('gulp'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify'),
    streamify = require('gulp-streamify'),
    rename = require('gulp-rename'),
    bundleLogger = require('../../util/bundleLogger'),
    handleErrors = require('../../util/handleErrors'),
    configStatic = require('../../config').mobile.scripts.static,
    configDevelopment = require('../../config').mobile.scripts.development,
    configProduction = require('../../config').mobile.scripts.production;

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

gulp.task('[M][S] Scripts', function(cb) {

  /*==========  Client scripts  ==========*/

  var bundleQueue = 1;
  var clientBundler = browserify({
    cache: {}, packageCache: {},
    entries: configStatic.client.entries,
    extensions: configStatic.client.extensions
  });

  Object.keys(dependencies).forEach(function(key) {
    clientBundler.external(key);
  });

  var rebundle = function() {
    bundleLogger.start(configStatic.client.outputName);

    clientBundler.bundle()
      .on('error', handleErrors)
      .pipe(source(configStatic.client.outputName))
      .pipe(gulp.dest(configStatic.client.dest))
      .on('end', function() {
        bundleLogger.end(configStatic.client.outputName);
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
    entries: configStatic.vendor.entries,
    extensions: configStatic.vendor.extensions
  });

  Object.keys(dependencies).forEach(function(key) {
    vendorBundler.require(dependencies[key], {expose: key});
  });

  bundleLogger.start(configStatic.vendor.outputName);

  vendorBundler
    .transform('browserify-shim')
    .transform('coffee-reactify')
    .bundle()
    .on('error', handleErrors)
    .pipe(source(configStatic.vendor.outputName))
    .pipe(gulp.dest(configStatic.vendor.dest))
    .on('end', function() {
      bundleLogger.end(configStatic.vendor.outputName);
    });
});

gulp.task('[M][D] Scripts', function() {

  /*==========  Bundle scripts  ==========*/

  var appBundler = browserify({
    cache: {}, packageCache: {},
    entries: configDevelopment.bundle.entries,
    extensions: configDevelopment.bundle.extensions
  });

  Object.keys(dependencies).forEach(function(key) {
    appBundler.require(dependencies[key], {expose: key});
  });

  bundleLogger.start(configDevelopment.bundle.outputName);

  appBundler
    .transform('browserify-shim')
    .transform('babelify', {ignore: /(node_modules|bower_components)/})
    .transform('coffee-reactify')
    .bundle()
    .on('error', handleErrors)
    .pipe(source(configDevelopment.bundle.outputName))
    .pipe(gulp.dest(configDevelopment.bundle.dest))
    .on('end', function() {
      bundleLogger.end(configDevelopment.bundle.outputName);
    });

  /*==========  Components scripts  ==========*/

  var componentsBundler = browserify({
    cache: {}, packageCache: {},
    entries: configDevelopment.components.entries,
    extensions: configDevelopment.components.extensions
  });

  Object.keys(dependencies).forEach(function(key) {
    componentsBundler.require(dependencies[key], {expose: key});
  });

  bundleLogger.start(configDevelopment.components.outputName);
  componentsBundler
    .transform('babelify', {ignore: /(node_modules|bower_components|bundlePrerender\.js)/})
    .transform('browserify-shim')
    .transform('coffee-reactify')
    .bundle()
    .on('error', handleErrors)
    .pipe(source(configDevelopment.components.outputName))
    .pipe(gulp.dest(configDevelopment.components.dest))
    .on('end', function() {
      bundleLogger.end(configDevelopment.components.outputName);
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

  bundleLogger.start(configProduction.bundle.outputName);

  appBundler
    .transform('browserify-shim')
    .transform('babelify', {ignore: /(node_modules|bower_components)/})
    .transform('coffee-reactify')
    .bundle()
    .on('error', handleErrors)
    .pipe(source(configProduction.bundle.outputName))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(configProduction.bundle.dest))
    .on('end', function() {
      bundleLogger.end(configProduction.bundle.outputName);
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
    .transform('babelify', {ignore: /(node_modules|bower_components|bundlePrerender\.js)/})
    .transform('browserify-shim')
    .transform('coffee-reactify')
    .bundle()
    .on('error', handleErrors)
    .pipe(source(configProduction.components.outputName))
    .pipe(gulp.dest(configProduction.components.dest))
    .on('end', function() {
      bundleLogger.end(configProduction.components.outputName);
    });
});