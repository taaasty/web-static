if [ -f ./index.html ]; then
  echo 'Ok мы в gh-pages'
else
  ./node_modules/gulp/bin/gulp.js dist &&
  node ./dist_tests/mobile_prerender.js
fi