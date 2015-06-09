var gulp = require('gulp'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify'),
    streamify = require('gulp-streamify'),
    rename = require('gulp-rename'),
    bundleLogger = require('../../util/bundleLogger'),
    handleErrors = require('../../util/handleErrors'),
    configStatic = require('../../config').desktop.scripts.static,
    configDevelopment = require('../../config').desktop.scripts.development,
    configProduction = require('../../config').desktop.scripts.production;

// External dependencies we do not want to rebundle while developing,
// but include in our dist bundle
var dependencies = {
  'jquery': './node_modules/jquery/dist/jquery',
  'jquery.ui.core': './app/bower_components/jquery-ui/ui/core',
  'jquery.ui.slider': './app/bower_components/jquery-ui/ui/slider',
  'jquery.ui.draggable': './app/bower_components/jquery-ui/ui/draggable',
  'jquery.ui.mouse': './app/bower_components/jquery-ui/ui/mouse',
  'jquery.ui.widget': './app/bower_components/jquery-ui/ui/widget',
  'jquery.ui.touch-punch': './app/bower_components/jqueryui-touch-punch/jquery.ui.touch-punch',
  'jquery.waypoints': './app/bower_components/jquery-waypoints/waypoints',
  'jquery.collage': './app/scripts/desktop/plugins/jquery.collage',
  'jquery.connection': './app/scripts/desktop/plugins/jquery.connection',
  'jquery.fileupload': './app/bower_components/blueimp-file-upload/js/jquery.fileupload',
  'masonry-layout': './node_modules/masonry-layout/masonry',
  'lodash': './node_modules/lodash',
  'react': './node_modules/react',
  'react-mixin-manager': './app/bower_components/react-mixin-manager/react-mixin-manager',
  'reactUjs': './app/scripts/shared/libs/react_ujs',
  'react-color-picker': './node_modules/react-color-picker/dist/react-color-picker',
  'baron': './app/bower_components/baron/baron',
  'mousetrap': './app/bower_components/mousetrap/mousetrap',
  'bowser': './node_modules/bowser',
  'autosize': './node_modules/autosize/dist/autosize',
  'eventEmitter': './app/bower_components/eventEmitter/EventEmitter',
  'pusher': './app/bower_components/pusher/dist/pusher',
  'i18next': './app/bower_components/i18next/i18next',
  'bootstrap.tooltip': './app/bower_components/bootstrap/js/tooltip',
  'Modernizr': './app/scripts/desktop/shims/modernizr',
  'introJs': './app/bower_components/intro.js/intro',
  'es5-shim': './app/bower_components/es5-shim/es5-shim',
  'jquery.mousewheel': './app/bower_components/jquery.mousewheel/jquery.mousewheel',
  'jquery.scrollto': './app/bower_components/jquery.scrollto/jquery.scrollTo',
  'undo': './app/bower_components/undo/undo',
  'medium-editor': './app/bower_components/medium-editor/dist/js/medium-editor',
  'aviator': './app/bower_components/aviator/src/main',
  'nanobar': './app/bower_components/nanobar/index',
  'URIjs': './node_modules/URIjs/src/URI',
  'jquery.select2': './app/bower_components/select2/dist/js/select2',
  'numeral': './node_modules/numeral',
  'react-tap-event-plugin': './node_modules/react-tap-event-plugin'
}

gulp.task('[D][S] Scripts', function(cb) {

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
    .transform('babelify', {
      stage: 0
    })
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

gulp.task('[D][D] Scripts', function() {
  var appBundler = browserify({
    cache: {}, packageCache: {},
    entries: configDevelopment.entries,
    extensions: configDevelopment.extensions
  });

  Object.keys(dependencies).forEach(function(key) {
    appBundler.require(dependencies[key], {expose: key});
  });

  bundleLogger.start(configDevelopment.outputName);

  return appBundler
    .transform('babelify', {
      ignore: /(node_modules|bower_components|shims)/,
      stage: 0
    })
    .transform('browserify-shim')
    .transform('coffee-reactify')
    .bundle()
    .on('error', handleErrors)
    .pipe(source(configDevelopment.outputName))
    .pipe(gulp.dest(configDevelopment.dest))
    .on('end', function() {
      bundleLogger.end(configDevelopment.outputName);
    });
});

gulp.task('[D][P] Scripts', function() {
  var appBundler = browserify({
    cache: {}, packageCache: {},
    entries: configProduction.entries,
    extensions: configProduction.extensions
  });

  Object.keys(dependencies).forEach(function(key) {
    appBundler.require(dependencies[key], {expose: key});
  });

  bundleLogger.start(configProduction.outputName);

  return appBundler
    .transform('babelify', {
      ignore: /(node_modules|bower_components|shims)/,
      stage: 0
    })
    .transform('browserify-shim')
    .transform('coffee-reactify')
    .bundle()
    .on('error', handleErrors)
    .pipe(source(configProduction.outputName))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(configProduction.dest))
    .on('end', function() {
      bundleLogger.end(configProduction.outputName);
    });
});