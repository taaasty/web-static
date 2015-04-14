var gulp = require('gulp'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify'),
    streamify = require('gulp-streamify'),
    rename = require('gulp-rename'),
    bundleLogger = require('../../util/bundleLogger'),
    handleErrors = require('../../util/handleErrors'),
    configLocal = require('../../config').desktop.local.scripts,
    configProduction = require('../../config').desktop.production.scripts;

// External dependencies we do not want to rebundle while developing,
// but include in our dist bundle
var dependencies = {
  'jquery': './node_modules/jquery/dist/jquery',
  'jquery.ui.core': './app/bower_components/jquery-ui/ui/core',
  'jquery.ui.slider': './app/bower_components/jquery-ui/ui/slider',
  'jquery.ui.draggable': './app/bower_components/jquery-ui/ui/draggable',
  'jquery.ui.mouse': './app/bower_components/jquery-ui/ui/mouse',
  'jquery.ui.widget': './app/bower_components/jquery-ui/ui/widget',
  'jquery.autosize': './app/bower_components/jquery-autosize/jquery.autosize',
  'jquery.waypoints': './app/bower_components/jquery-waypoints/waypoints',
  'jquery.autosize.input': './app/scripts/desktop/plugins/jquery.autosize.input',
  'jquery.collage': './app/scripts/desktop/plugins/jquery.collage',
  'jquery.fileupload': './app/bower_components/blueimp-file-upload/js/jquery.fileupload',
  'masonry-layout': './node_modules/masonry-layout/masonry',
  'lodash': './node_modules/lodash',
  'react': './node_modules/react',
  'react-mixin-manager': './app/bower_components/react-mixin-manager/react-mixin-manager',
  'reactUjs': './app/scripts/shared/libs/react_ujs',
  'react-color-picker': './app/bower_components/react-color-picker/dist/react-color-picker',
  'baron': './app/bower_components/baron/baron',
  'mousetrap': './app/bower_components/mousetrap/mousetrap',
  'bowser': './app/bower_components/bowser/bowser',
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
  'moment': './node_modules/moment/moment'
}

gulp.task('[D][L] Scripts', function(cb) {

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

gulp.task('[D][P] Scripts', function() {
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
    .transform('babelify', {ignore: /(node_modules|bower_components|shims)/})
    .transform('browserify-shim')
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
});