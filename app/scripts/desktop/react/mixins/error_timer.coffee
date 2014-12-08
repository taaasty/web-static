ERROR_TIMEOUT = 1000

window.ErrorTimerMixin =

  componentWillUnmount: ->
    @clearErrorTimer()

  clearErrorTimer: ->
    clearTimeout @errorTimer if @errorTimer

  startErrorTimer: ->
    @setState isError: true unless @state.isError
    @errorTimer = setTimeout @closeError, 1000

  closeError: ->
    @setState isError: false