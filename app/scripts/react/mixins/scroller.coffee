window.ScrollerMixin =

  componentDidMount: ->
    # $('body').addClass 'no-scroll'
    @initScroll()

  componentDidUpdate: -> @scroller.update()

  componentWillUnmount: ->
    # $('body').removeClass 'no-scroll'
    @scroller.dispose()
    @$scroller = @scroller = null

  initScroll: ->
    # TODO Скроллинг только в пределах попапа
    @$scroller = $( @refs.scroller.getDOMNode() )

    @scroller = @$scroller.baron
      scroller: '.js-scroller-pane'
      bar:      '.js-scroller-bar'
      track:    '.js-scroller-track'
      barOnCls: 'scroller--tracked'
      pause:    0