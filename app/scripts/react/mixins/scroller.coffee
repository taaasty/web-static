window.ScrollerMixin =

  componentDidMount: ->
    $(document).on 'DOMMouseScroll mousewheel', '.js-scroller-pane', @handleMouseWheel

    @initScroll()

  componentDidUpdate: -> @scroller.update()

  componentWillUnmount: ->
    $(document).off 'DOMMouseScroll mousewheel', '.js-scroller-pane', @handleMouseWheel

    @scroller.dispose()
    @$scroller = @scroller = null

  initScroll: ->
    @$scroller = $( @refs.scroller.getDOMNode() )

    @scroller = @$scroller.baron
      scroller: '.js-scroller-pane'
      bar:      '.js-scroller-bar'
      track:    '.js-scroller-track'
      barOnCls: 'scroller--tracked'
      pause:    0

  handleMouseWheel: (ev) ->
    el           = ev.currentTarget
    scrollTop    = el.scrollTop
    scrollHeight = el.scrollHeight
    height       = $(el).height()
    delta        = (if ev.type is 'DOMMouseScroll' then ev.originalEvent.detail * -40 else ev.originalEvent.wheelDelta)
    up           = delta > 0

    prevent = ->
      ev.stopPropagation()
      ev.preventDefault()
      ev.returnValue = false
      return false

    if (!up && -delta > scrollHeight - height - scrollTop)
      $(el).scrollTop scrollHeight
      return prevent()
    else if (up && delta > scrollTop)
      $(el).scrollTop(0)
      return prevent()