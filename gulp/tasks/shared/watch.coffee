gulp = require 'gulp'

gulp.task '[S] Watch', ['[S] BrowserSync'], ->
  gulp.watch 'app/html/desktop/*.html',            ['[D] Html']
  gulp.watch 'app/stylesheets/desktop/**/*.less',  ['[D][L] Styles']
  gulp.watch 'app/scripts/desktop/locales/*.json', ['[D][L] Locales']
  gulp.watch 'app/html/mobile/**/*.html',          ['[M] Html']
  gulp.watch 'app/stylesheets/mobile/**/*.less',   ['[M][L] Styles']
  gulp.watch 'app/scripts/mobile/locales/*.json',  ['[M][L] Locales']