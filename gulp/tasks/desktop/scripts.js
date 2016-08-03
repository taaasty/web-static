import gulp from 'gulp';
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import uglify from 'gulp-uglify';
import streamify from 'gulp-streamify';
import envify from 'envify/custom';
import bundleLogger from '../../util/bundleLogger';
import handleErrors from '../../util/handleErrors';
const config = require('../../config')
  .desktop.scripts;

const babelifyOpts = {
  ignore: /(node_modules|bower_components|shims)/,
};

// External dependencies we do not want to rebundle while developing,
// but include in our dist bundle
const dependencies = {
  'jquery': './node_modules/jquery/dist/jquery',
  'jquery.ui.core': './app/bower_components/jquery-ui/ui/core',
  'jquery.ui.slider': './app/bower_components/jquery-ui/ui/slider',
  'jquery.ui.draggable': './app/bower_components/jquery-ui/ui/draggable',
  'jquery.ui.mouse': './app/bower_components/jquery-ui/ui/mouse',
  'jquery.ui.widget': './app/bower_components/jquery-ui/ui/widget',
  'jquery.ui.touch-punch': './app/bower_components/jqueryui-touch-punch/jquery.ui.touch-punch',
  'jquery.collage': './app/scripts/desktop/plugins/jquery.collage',
  'jquery.connection': './app/scripts/desktop/plugins/jquery.connection',
  'jquery.fileupload': './app/bower_components/blueimp-file-upload/js/jquery.fileupload',
  'masonry-layout': './node_modules/masonry-layout/masonry',
  'lodash': './node_modules/lodash',
  'react': './node_modules/react/',
  'react-dom': './node_modules/react-dom',
  'react-mixin-manager': './app/bower_components/react-mixin-manager/react-mixin-manager',
  'reactUjs': './app/scripts/shared/libs/ReactUjs',
  'react-portal': './node_modules/react-portal',
  'react-color-picker': './node_modules/react-color-picker',
  'baron': './app/bower_components/baron/baron',
  'mousetrap': './app/bower_components/mousetrap/mousetrap',
  'bowser': './node_modules/bowser',
  'autosize': './node_modules/autosize/dist/autosize',
  'eventEmitter': './app/bower_components/eventEmitter/EventEmitter',
  'pusher': './app/bower_components/pusher/dist/pusher',
  'i18next': './node_modules/i18next',
  'i18next-xhr-backend': './node_modules/i18next-xhr-backend',
  'bootstrap.tooltip': './app/bower_components/bootstrap/js/tooltip',
  'Modernizr': './app/scripts/desktop/shims/modernizr',
  'introJs': './app/bower_components/intro.js/intro',
  'es5-shim': './app/bower_components/es5-shim/es5-shim',
  'jquery.mousewheel': './app/bower_components/jquery.mousewheel/jquery.mousewheel',
  'jquery.scrollto': './app/bower_components/jquery.scrollto/jquery.scrollTo',
  'undo': './app/bower_components/undo/undo',
  'medium-editor': './node_modules/medium-editor/dist/js/medium-editor',
  'nanobar': './app/bower_components/nanobar/index',
  'urijs': './node_modules/urijs',
  'numeral': './node_modules/numeral',
  'react-tap-event-plugin': './node_modules/react-tap-event-plugin',
  'color': './node_modules/color',
  'react-lazy-load': './node_modules/react-lazy-load',
  'react-imageloader': './node_modules/react-imageloader',
  'set-query-string': './node_modules/set-query-string',
};

gulp.task('[D][S] Client scripts', () => {
  let bundler = browserify({
    cache: {},
    packageCache: {},
    entries: config.static.client.entries,
    extensions: config.static.client.extensions,
  });

  Object.keys(dependencies)
    .forEach((dep) => {
      bundler.external(dep);
    });

  function rebundle() {
    bundleLogger.start(config.static.client.outputName);

    bundler.bundle()
      .on('error', handleErrors)
      .pipe(source(config.static.client.outputName))
      .pipe(gulp.dest(config.static.client.dest))
      .on('end', () => {
        bundleLogger.end(config.static.client.outputName);
      });
  }

  if (global.isWatching) {
    bundler = watchify(bundler
      .transform('babelify', babelifyOpts)
      .transform('browserify-shim')
      .transform('coffee-reactify')
    );
    bundler.on('update', rebundle);
  } else {
    bundler
      .transform('babelify', babelifyOpts)
      .transform('browserify-shim')
      .transform('coffee-reactify');
  }

  rebundle();
});

gulp.task('[D][S] Vendor scripts', (cb) => {
  let bundler = browserify({
    cache: {},
    packageCache: {},
    entries: config.static.vendor.entries,
    extensions: config.static.vendor.extensions,
  });

  Object.keys(dependencies)
    .forEach((dep) => {
      bundler.require(dependencies[dep], { expose: dep });
    });

  bundleLogger.start(config.static.vendor.outputName);

  bundler
    .transform('browserify-shim')
    .transform('coffee-reactify')
    .bundle()
    .on('error', handleErrors)
    .pipe(source(config.static.vendor.outputName))
    .pipe(gulp.dest(config.static.vendor.dest))
    .on('end', () => {
      bundleLogger.end(config.static.vendor.outputName);
      cb();
    });
});

gulp.task('[D][S] Test scripts', () => {
  let bundler = browserify({
    cache: {},
    packageCache: {},
    entries: config.static.test.entries,
    extensions: config.static.test.extensions,
  });

  Object.keys(dependencies)
    .forEach((dep) => {
      bundler.external(dep);
    });

  function rebundle() {
    bundleLogger.start(config.static.test.outputName);

    return bundler.bundle()
      .on('error', handleErrors)
      .pipe(source(config.static.test.outputName))
      .pipe(gulp.dest(config.static.test.dest))
      .on('end', () => {
        bundleLogger.end(config.static.test.outputName);
      });
  }

  if (global.isWatching) {
    bundler = watchify(bundler
      .transform('babelify', babelifyOpts)
      .transform('browserify-shim')
      .transform('coffee-reactify')
    );
    bundler.on('update', rebundle);
  } else {
    bundler
      .transform('babelify', babelifyOpts)
      .transform('browserify-shim')
      .transform('coffee-reactify');
  }

  return rebundle();
});

gulp.task('[D][D] Scripts', () => {
  let bundler = browserify({
    cache: {},
    packageCache: {},
    entries: config.development.entries,
    extensions: config.development.extensions,
  });

  Object.keys(dependencies)
    .forEach((dep) => {
      bundler.require(dependencies[dep], { expose: dep });
    });

  bundleLogger.start(config.development.outputName);

  return bundler
    .transform('babelify', babelifyOpts)
    .transform('browserify-shim')
    .transform('coffee-reactify')
    .bundle()
    .on('error', handleErrors)
    .pipe(source(config.development.outputName))
    .pipe(gulp.dest(config.development.dest))
    .on('end', () => {
      bundleLogger.end(config.development.outputName);
    });
});

gulp.task('[D][P] Test scripts', () => {
  const { dest, entries, extensions, outputName } = config.production.test;

  bundleLogger.start(outputName);

  return browserify({
      entries,
      extensions,
      cache: {},
      packageCache: {},
    })
    .transform('babelify', babelifyOpts)
    .transform('browserify-shim')
    .bundle()
    .on('error', handleErrors)
    .pipe(source(outputName))
    .pipe(gulp.dest(dest))
    .on('end', () => {
      bundleLogger.end(outputName);
    });
});

gulp.task('[D][P] Scripts', () => {
  const { dest, entries, extensions, outputName } = config.production.bundle;

  let bundler = browserify({
    cache: {},
    packageCache: {},
    entries: entries,
    extensions: extensions,
  });

  Object.keys(dependencies)
    .forEach((dep) => {
      bundler.require(dependencies[dep], { expose: dep });
    });

  bundleLogger.start(outputName);

  return bundler
    .transform('babelify', babelifyOpts)
    .transform('browserify-shim')
    .transform('coffee-reactify')
    .transform(envify({
      'NODE_ENV': 'production',
    }, {
      global: true,
    }))
    .bundle()
    .on('error', handleErrors)
    .pipe(source(outputName))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(dest))
    .on('end', () => {
      bundleLogger.end(outputName);
    });
});

gulp.task('[D][P] GA', () => {
  const { dest, entries, extensions, outputName } = config.production.ga;

  const bundler = browserify({
    cache: {},
    packageCache: {},
    entries: entries,
    extensions: extensions,
  });

  bundleLogger.start(outputName);

  return bundler
    .transform('babelify', babelifyOpts)
    .bundle()
    .on('error', handleErrors)
    .pipe(source(outputName))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(dest))
    .on('end', () => {
      bundleLogger.end(outputName);
    });
});

gulp.task('[D][P] AdBlock', () => {
  const { entries, dest } = config.production.adblock;

  bundleLogger.start('AdBlock');

  return gulp.src(entries)
    .pipe(gulp.dest(dest))
    .on('end', () => bundleLogger.end('AdBlock'));
});
