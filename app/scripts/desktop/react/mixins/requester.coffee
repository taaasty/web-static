Nanobar = require 'nanobar'
nanobar = new Nanobar(bg: '#24df88')

# /*===================================================
# =            Rewriting jQuery's ajax xhr            =
# ===================================================*/

oldXHR = $.ajaxSettings.xhr

$.ajaxSettings.xhr = ->
  xhr = oldXHR()

  if xhr instanceof window.XMLHttpRequest
    xhr.addEventListener 'progress', @progress, false

  if xhr.upload
    xhr.upload.addEventListener 'progress', @progress, false

  return xhr

# /*-----  End of Rewriting jQuery's ajax xhr  ------*/

window.RequesterMixin =

  createRequest: (settings, options = {}) ->
    if options.progressBar?
      settings.progress = (e) ->
        if e.lengthComputable
          progress        = e.loaded / e.total
          percentComplete = Math.round(progress * 100)
          nanobar.go percentComplete

    jqXHR = $.ajax settings
    jqXHR.always => @removeActiveRequest jqXHR
    @addActiveRequest jqXHR
    jqXHR

  activeRequests: ->
    @_activeRequests ? []

  addActiveRequest: (jqXHR) ->
    @_activeRequests = @_activeRequests ? []
    @_activeRequests.push jqXHR

  removeActiveRequest: (jqXHR) ->
    index = @_activeRequests.indexOf jqXHR
    @_activeRequests.splice index, 1 if index > -1

  abortActiveRequests: ->
    return unless @_activeRequests
    @_activeRequests.map (jqXHR) -> jqXHR.abort()
    @_activeRequests = []

  componentWillUnmount: -> @abortActiveRequests()

# Варианты ajax-ных либок:
#  https://github.com/ded/reqwest
#  https://github.com/jakutis/httpinvoke
#  http://visionmedia.github.io/superagent/
#  http://microjs.com/#ajax