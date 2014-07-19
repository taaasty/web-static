"use strict"

# Load plugins
handleError = (err) -> @emit "end"
gulp = require("gulp")
#less = require("less")

#less.tree.functions["image-url"] = ->
  #uri = 'teeeesty'
  #console.warn 'aaaa'
  #return new(tree.URL)(new(tree.Anonymous)(uri))

#less.tree.functions["aaa"] = (arg)->
  #console.warn 'bbb'
  #"testyyy"

path = require("path")

$ = require("gulp-load-plugins")()
sourcemaps = require("gulp-sourcemaps")

# Scripts
gulp.task "scripts", ->
  
  #.pipe($.jshint('.jshintrc'))
  #.pipe($.jshint.reporter('default'))
  gulp.src("app/scripts/main.coffee",
    read: false
  )
    .pipe($.browserify(
      insertGlobals: true
      extensions: [
        ".coffee"
        ".csjx"
        ".js.jsx.coffee"
      ]
      transform: [
        "coffeeify"
        "reactify"
        "debowerify"
      ]
    ))
    .on("error", handleError)
    .pipe($.rename("bundle.js"))
    .pipe(gulp.dest("dist/scripts"))
    .pipe($.size())
    .pipe $.connect.reload()


less_pipe = $.less(paths: [path.join(__dirname, "less", "includes")])


gulp.task "less", ->
  gulp
    .src("./app/stylesheets/main.less")
    .pipe(sourcemaps.init())
    .pipe(less_pipe)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist/stylesheets"))
    .on "error", $.util.log
  return

gulp.task "jade", ->
  gulp
    .src("app/template/*.jade")
    .pipe($.jade(pretty: true))
    .pipe(gulp.dest("dist"))
    .pipe $.connect.reload()


#gulp.task('styles', function () {
#return gulp.src('app/styles/main.css')
#.pipe($.autoprefixer('last 1 version'))
#.pipe(gulp.dest('.tmp/styles'))
#.pipe($.size());
#});
gulp.task "fonts", ->
  $.bowerFiles()
    .pipe($.filter("**/*.{eot,svg,ttf,woff}"))
    .pipe($.flatten())
    .pipe(gulp.dest("dist/fonts"))
    .pipe $.size()

gulp.task "assets", ->
  gulp
    .src("app/{api,javascripts,stylesheets}/**/*.{less,css,json,html,js}")
    .pipe gulp.dest("dist/")


# HTML
gulp.task "html", ->
  gulp
    .src("app/*.html")
    .pipe($.useref())
    .pipe(gulp.dest("dist"))
    .pipe($.size())
    .pipe($.connect.reload())
    .on "error", $.util.log


# Images
gulp.task "images", ->
  
  #.pipe($.cache($.imagemin({
  #optimizationLevel: 3,
  #progressive: true,
  #interlaced: true
  #})))
  gulp
    .src("app/images/**/*")
    .pipe(gulp.dest("dist/images"))
    .pipe($.size())
    .pipe $.connect.reload()


# Clean
gulp.task "clean", ->
  gulp.src("dist",
    read: false
  ).pipe $.clean()


gulp.task "styles", ["less"]

# Bundle
gulp.task "bundle", [
  "assets"
  "scripts"
  "styles"
  "bower"
], $.bundle("./app/*.html")

# Build
gulp.task "build", [
  "html"
  "bundle"
  "images"
]

# Default task
gulp.task "default", ["clean"], ->
  gulp.start "build"
  return


# Connect
gulp.task "connect", $.connect.server(
  root: ["dist"]
  port: 9000
  livereload: true
)

# Bower helper
gulp.task "bower", ->
  gulp.src("app/bower_components/**/*.{js,css}",
    base: "app/bower_components"
  ).pipe gulp.dest("dist/bower_components/")
  return

gulp.task "json", ->
  gulp.src("app/scripts/json/**/*.json",
    base: "app/scripts"
  ).pipe gulp.dest("dist/scripts/")
  return


# Watch
gulp.task "watch", [
  "images"
  "assets"
  "html"
  "bundle"
  "connect"
], ->
  
  # Watch .json files
  #gulp.watch('app/scripts/**/*.json', ['json']);
  
  # Watch .html files
  gulp.watch "app/*.html", ["html"]
  
  # Watch .jade files
  #gulp.watch('app/template/**/*.jade', ['jade', 'html']);
  
  # Watch .coffeescript files
  #gulp.watch('app/scripts/**/*.coffee', ['coffee', 'scripts']);
  gulp.watch "app/scripts/**/*.coffee", ["scripts"]
  gulp.watch "app/stylesheets/**/*.css", ["assets"]
  gulp.watch "app/stylesheets/**/*.less", ["less"]
  
  # Watch .jsx files
  # gulp.watch('app/scripts/**/*.jsx', ['jsx', 'scripts']);
  
  # Watch .js files
  gulp.watch "app/scripts/**/*.js", ["scripts"]
  
  # Watch image files
  gulp.watch "app/images/**/*", ["images"]
  return

