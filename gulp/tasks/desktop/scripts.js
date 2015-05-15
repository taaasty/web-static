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
  'jquery.autosize': './app/bower_components/jquery-autosize/jquery.autosize',
  'jquery.waypoints': './app/bower_components/jquery-waypoints/waypoints',
  'jquery.autosize.input': './app/scripts/desktop/plugins/jquery.autosize.input',
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
  'eventEmitter': './app/bower_components/eventEmitter/EventEmitter',
  'pusher': './app/bower_components/pusher/dist/pusher',
  'i18next': './app/bower_components/i18next/i18next',
  'bootstrap.tooltip': './app/bower_components/bootstrap/js/tooltip',
  'Modernizr': './app/scripts/desktop/shims/modernizr',
  'swfobject': './app/scripts/desktop/shims/swf/swfobject',
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

gulp.task('[D][D] Scripts', function() {
  var appBundler = browserify({
    cache: {}, packageCache: {},
    entries: configDevelopment.bundle.entries,
    extensions: configDevelopment.bundle.extensions
  });

  Object.keys(dependencies).forEach(function(key) {
    appBundler.require(dependencies[key], {expose: key});
  });

  bundleLogger.start(configDevelopment.bundle.outputName);

  return appBundler
    .transform('babelify', {ignore: /(node_modules|bower_components|shims)/})
    .transform('browserify-shim')
    .transform('coffee-reactify')
    .bundle()
    .on('error', handleErrors)
    .pipe(source(configDevelopment.bundle.outputName))
    .pipe(gulp.dest(configDevelopment.bundle.dest))
    .on('end', function() {
      bundleLogger.end(configDevelopment.bundle.outputName);
    });
});

gulp.task('[D][P] Scripts', function() {
  var appBundler = browserify({
    cache: {}, packageCache: {},
    entries: configProduction.bundle.entries,
    extensions: configProduction.bundle.extensions
  });

  Object.keys(dependencies).forEach(function(key) {
    appBundler.require(dependencies[key], {expose: key});
  });

  bundleLogger.start(configProduction.bundle.outputName);

  return appBundler
    .transform('babelify', {ignore: /(node_modules|bower_components|shims)/})
    .transform('browserify-shim')
    .transform('coffee-reactify')
    .bundle()
    .on('error', handleErrors)
    .pipe(source(configProduction.bundle.outputName))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(configProduction.bundle.dest))
    .on('end', function() {
      bundleLogger.end(configProduction.bundle.outputName);
    });
});