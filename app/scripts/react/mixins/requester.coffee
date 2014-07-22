window.RequesterMixin =

  createRequest: (settings) ->
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
    @_activeRequests.map (jqXHR) -> jqXHR.abort()
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