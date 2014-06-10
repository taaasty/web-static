'use strict';

// https://github.com/thlorenz/browserify-shim
// https://github.com/sindresorhus/gulp-template
// http://blog.nodejitsu.com/npmawesome-9-gulp-plugins/

var gulp = require('gulp');

// Load plugins
var $ = require('gulp-load-plugins')();


// CoffeeScript
//gulp.task('coffee', function () {
    //return gulp.src('app/scripts/**/*.coffee', {base: 'app/scripts'})
        //.pipe(
            //$.coffee({ bare: true }).on('error', $.util.log)
        //)
        //.pipe(gulp.dest('app/scripts'));
//});


// https://github.com/deepak1556/gulp-browserify
// Scripts
gulp.task('scripts', function () {
    return gulp.src('app/scripts/main.coffee', { read: false })
        .pipe($.browserify({
            insertGlobals: true,
            extensions: ['.coffee', '.csjx'],
            transform: ['coffeeify', 'reactify', 'debowerify']
        }))
        .pipe($.rename('bundle.js'))
        //.pipe($.jshint('.jshintrc'))
        //.pipe($.jshint.reporter('default'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe($.size())
        .pipe($.connect.reload());
    });

// React precomiler
// gulp.task('jsx', function () {
//     return gulp.src('app/scripts/**/*.jsx', {base: 'app/scripts'})
//         .pipe($.react())
//         .pipe($.jshint('.jshintrc'))
//         .pipe($.jshint.reporter('default'))
//         .pipe(gulp.dest('app/scripts'))
//         .pipe($.size())
//         .pipe($.connect.reload());
//     });

var path = require('path');
gulp.task('less', function () {
  //gulp.src('./app/styles/**/*.less')
  gulp.src('./app/stylesheets/main.less')
    .pipe($.less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('dist/stylesheets'))
    .on('error', $.util.log);
});


gulp.task('jade', function () {
    return gulp.src('app/template/*.jade')
        .pipe($.jade({ pretty: true }))
        .pipe(gulp.dest('dist'))
        .pipe($.connect.reload());
})

//gulp.task('styles', function () {
    //return gulp.src('app/styles/main.css')
        //.pipe($.autoprefixer('last 1 version'))
        //.pipe(gulp.dest('.tmp/styles'))
        //.pipe($.size());
//});

gulp.task('fonts', function () {
    return $.bowerFiles()
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest('dist/fonts'))
        .pipe($.size());
});


gulp.task('assets', function (){
    return gulp.src('app/{api,javascripts}/**/*.{json,html,js}')
        .pipe(gulp.dest('dist/'));
});


// HTML
gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size())
        .pipe($.connect.reload())
        .on('error', $.util.log);
});

// Images
gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size())
        .pipe($.connect.reload());
});

// Clean
gulp.task('clean', function () {
    return gulp.src('dist', {read: false}).pipe($.clean());
    //return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {read: false}).pipe($.clean());
});

gulp.task('styles', ['less' ]);

// Bundle
gulp.task('bundle', ['assets', 'scripts', 'styles', 'bower'], $.bundle('./app/*.html'));

// Build
gulp.task('build', ['html', 'bundle', 'images']);

// Default task
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

// Connect
gulp.task('connect', $.connect.server({
    root: ['dist'],
    port: 9000,
    livereload: true
}));

// Bower helper
gulp.task('bower', function() {
    gulp.src('app/bower_components/**/*.js', {base: 'app/bower_components'})
        .pipe(gulp.dest('dist/bower_components/'));

});

gulp.task('json', function() {
    gulp.src('app/scripts/json/**/*.json', {base: 'app/scripts'})
        .pipe(gulp.dest('dist/scripts/'));
});


// Watch
gulp.task('watch', ['images', 'html', 'bundle', 'connect'], function () {

    // Watch .json files
    //gulp.watch('app/scripts/**/*.json', ['json']);

    // Watch .html files
    gulp.watch('app/*.html', ['html']);

    // Watch .jade files
    //gulp.watch('app/template/**/*.jade', ['jade', 'html']);

    // Watch .coffeescript files
    //gulp.watch('app/scripts/**/*.coffee', ['coffee', 'scripts']);
    gulp.watch('app/scripts/**/*.coffee', ['scripts']);

    // gulp.watch('app/styles/**/*.css', ['styles']);
    gulp.watch('app/stylesheets/**/*.less', ['less']);

    // Watch .jsx files
    // gulp.watch('app/scripts/**/*.jsx', ['jsx', 'scripts']);

    // Watch .js files
    gulp.watch('app/scripts/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('app/images/**/*', ['images']);
});
