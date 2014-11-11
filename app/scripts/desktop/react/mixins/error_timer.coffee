ERROR_TIMEOUT = 1000

window.ErrorTimerMixin =

  clearErrorTimer: ->
    clearTimeout @errorTimer if @errorTimer

  startErrorTimer: ->
    @setState isError: true unless @state.isError
    @errorTimer = setTimeout @closeError, 1000

  closeError: ->
    @setState isError: false