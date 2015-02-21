if [ -f ./index.html ]; then
  echo 'Ok мы в gh-pages'
else
  ./node_modules/gulp/bin/gulp.js dist
fi