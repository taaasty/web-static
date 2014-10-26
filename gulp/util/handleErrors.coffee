# /*=========================================
# =            HandleErrors util            =
# =========================================*/

notify = require 'gulp-notify'

module.exports = ->
  args = Array.prototype.slice.call arguments

  notify.onError({
    title: 'Compile Error',
    message: '<%= error %>'
  }).apply(@, args)

  # Keep gulp from hanging on this task
  @emit 'end'