import gulp from 'gulp';
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import uglify from 'gulp-uglify';
import streamify from 'gulp-streamify';
import bundleLogger from '../../util/bundleLogger';
import handleErrors from '../../util/handleErrors';
const config = require('../../config').mobile.scripts;

const babelifyOpts = {
  stage: 0,
  ignore: /(node_modules|bower_components|shims)/,
  optional: ['runtime'],
};

// External dependencies we do not want to rebundle while developing,
// but include in our dist bundle
const dependencies = {
  react: './node_modules/react/addons',
  lodash: './node_modules/lodash',
  reactUjs: './app/scripts/shared/libs/react_ujs',
  eventEmitter: './app/bower_components/eventEmitter/EventEmitter',
  i18next: './app/bower_components/i18next/i18next',
  pusher: './app/bower_components/pusher/dist/pusher',
  jquery: './app/bower_components/jquery/dist/jquery',
  'react-lazy-load': './node_modules/react-lazy-load',
  'react-image-loader': './node_modules/react-imageloader',
};

gulp.task('[M][S] Client scripts', () => {
  let bundler = browserify({
    cache: {}, packageCache: {},
    entries: config.static.client.entries,
    extensions: config.static.client.extensions,
  });

  Object.keys(dependencies).forEach((dep) => {
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
  };

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

gulp.task('[M][S] Vendor scripts', (cb) => {
  let bundler = browserify({
    cache: {}, packageCache: {},
    entries: config.static.vendor.entries,
    extensions: config.static.vendor.extensions,
  });

  Object.keys(dependencies).forEach((dep) => {
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

gulp.task('[M][S] Test scripts', () => {
  let bundler = browserify({
    cache: {}, packageCache: {},
    entries: config.static.test.entries,
    extensions: config.static.test.extensions,
  });

  Object.keys(dependencies).forEach((dep) => {
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
  };

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

gulp.task('[M][P] Test scripts', () => {
  const { dest, entries, extensions, outputName } = config.production.test;

  bundleLogger.start(outputName);

  return browserify({
    cache: {},
    packageCache: {},
    entries: entries,
    extensions: extensions,
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

gulp.task('[M][D] Scripts', () => {
  let bundler = browserify({
    cache: {}, packageCache: {},
    entries: config.development.bundle.entries,
    extensions: config.development.bundle.extensions,
  });

  Object.keys(dependencies).forEach((dep) => {
    bundler.require(dependencies[dep], { expose: dep });
  });

  bundleLogger.start(config.development.bundle.outputName);

  return bundler
    .transform('babelify', babelifyOpts)
    .transform('browserify-shim')
    .transform('coffee-reactify')
    .bundle()
    .on('error', handleErrors)
    .pipe(source(config.development.bundle.outputName))
    .pipe(gulp.dest(config.development.bundle.dest))
    .on('end', () => {
      bundleLogger.end(config.development.bundle.outputName);
    });
});

gulp.task('[M][D] Components scripts', () => {
  let bundler = browserify({
    cache: {}, packageCache: {},
    entries: config.development.components.entries,
    extensions: config.development.components.extensions
  });

  Object.keys(dependencies).forEach((dep) => {
    bundler.require(dependencies[dep], { expose: dep });
  });

  bundleLogger.start(config.development.components.outputName);

  return bundler
    .transform('babelify', {
      ...babelifyOpts,
      ignore: /(node_modules|bower_components|bundlePrerender\.js)/,
    })
    .transform('browserify-shim')
    .transform('coffee-reactify')
    .bundle()
    .on('error', handleErrors)
    .pipe(source(config.development.components.outputName))
    .pipe(gulp.dest(config.development.components.dest))
    .on('end', () => {
      bundleLogger.end(config.development.components.outputName);
    });
});

gulp.task('[M][P] Scripts', () => {
  let bundler = browserify({
    cache: {}, packageCache: {},
    entries: config.production.bundle.entries,
    extensions: config.production.bundle.extensions,
  });

  Object.keys(dependencies).forEach((dep) => {
    bundler.require(dependencies[dep], { expose: dep });
  });

  bundleLogger.start(config.production.bundle.outputName);

  return bundler
    .transform('babelify', babelifyOpts)
    .transform('browserify-shim')
    .transform('coffee-reactify')
    .bundle()
    .on('error', handleErrors)
    .pipe(source(config.production.bundle.outputName))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(config.production.bundle.dest))
    .on('end', () => {
      bundleLogger.end(config.production.bundle.outputName);
    });
});

gulp.task('[M][P] Components scripts', () => {
  let bundler = browserify({
    cache: {}, packageCache: {},
    entries: config.production.components.entries,
    extensions: config.production.components.extensions,
  });

  Object.keys(dependencies).forEach((dep) => {
    bundler.require(dependencies[dep], { expose: dep });
  });

  bundleLogger.start(config.production.components.outputName);

  return bundler
    .transform('babelify', {
      ...babelifyOpts,
      ignore: /(node_modules|bower_components|bundlePrerender\.js)/,
    })
    .transform('browserify-shim')
    .transform('coffee-reactify')
    .bundle()
    .on('error', handleErrors)
    .pipe(source(config.production.components.outputName))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(config.production.components.dest))
    .on('end', () => {
      bundleLogger.end(config.production.components.outputName);
    });
});
