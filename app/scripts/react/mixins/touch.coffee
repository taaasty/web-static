window.TouchMixin =

  componentWillMount: ->
    if isMobile()
      @onMouseEnter = -> return
      @onMouseLeave = -> return