ERROR_TIMEOUT = 1000

window.ErrorTimerMixin =

  clearErrorTimer: ->
    clearInterval @errorTimer if @errorTimer

  startErrorTimer: ->
    @setState isError: true unless @state.isError
    @errorTimer = setInterval @closeError, 1000

  closeError: ->
    @setState isError: false