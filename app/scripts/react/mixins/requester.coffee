window.RequesterMixin =
  createRequest: (settings) ->
    xhr = $.ajax settings
    xhr.always =>
      @removeActiveRequest xhr
    @addActiveRequest xhr

    return xhr

  activeRequests: ->
    return @_activeRequests || []

  addActiveRequest: (xhr) ->
    @_activeRequests =[] unless @_activeRequests?
    @_activeRequests << xhr

  removeActiveRequest: (xhr) ->
    return unless @_activeRequests? && @_activeRequests.length>0
    index = @_activeRequests.indexOf xhr
    @_activeRequests.splice index, 1

  abortActiveRequests: ->
    @_activeRequests.map (xhr) -> xhr.abort()
    @_activeRequests = []

  safeUpdateState: (data, func) ->
    if @._compositeLifeCycleState == 'UNMOUNTING' ||
       @._compositeLifeCycleState == 'UNMOUNTED'  ||
       @._lifeCycleState == 'UNMOUNTING'          ||
       @._lifeCycleState == 'UNMOUNTED'           ||
       data.state() == 'rejected'
      return

    func(data)

# Варианты ajax-ных либок:
#  https://github.com/ded/reqwest
#  https://github.com/jakutis/httpinvoke
#  http://visionmedia.github.io/superagent/
#  http://microjs.com/#ajax
