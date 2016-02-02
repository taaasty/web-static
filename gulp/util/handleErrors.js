/*global global, process */
var notify = require('gulp-notify');

module.exports = function() {
  var args = Array.prototype.slice.call(arguments);

  notify.onError({
    title: 'Compile Error',
    message: '<%= error %>'
  }).apply(this, args);

  if (!global.isWatching) {
    process.exit(1);
  }

  // Keep gulp from hanging on this task
  this.emit('end');
};
