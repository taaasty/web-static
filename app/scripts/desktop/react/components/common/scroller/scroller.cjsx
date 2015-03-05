{ PropTypes } = React

Scroller = React.createClass
  displayName: 'Scroller'

  propTypes:
    children: PropTypes.oneOfType([
      PropTypes.element
      PropTypes.array
    ]).isRequired
    className: PropTypes.string

  componentDidMount: ->
    scroller = @getDOMNode()
    scrollerPane = @refs.scrollerPane.getDOMNode()

    @scroller = $(scroller).baron
      scroller: '.scroller__pane'
      bar: '.scroller__bar'
      track: '.scroller__track'
      barOnCls: 'scroller--tracked'
      pause: 0

    $(scrollerPane).on 'DOMMouseScroll mousewheel', @handleMouseWheel

  componentDidUpdate: -> @scroller.update()

  componentWillUnmount: ->
    scrollerPane = @refs.scrollerPane.getDOMNode()

    @scroller.dispose()
    @scroller = null

    $(scrollerPane).off 'DOMMouseScroll mousewheel', @handleMouseWheel

  render: ->
    scrollerClasses = ["scroller", "scroller--dark", @props.className].join ' '

    return <div className={ scrollerClasses }>
             <div ref="scrollerPane"
                  className="scroller__pane">
               { @props.children }
             </div>
             <div className="scroller__track">
               <div className="scroller__bar" />
             </div>
           </div>

  handleMouseWheel: (e) ->
    el           = e.currentTarget
    scrollTop    = el.scrollTop
    scrollHeight = el.scrollHeight
    height       = $(el).height()
    delta        = (if e.type is 'DOMMouseScroll' then e.originalEvent.detail * -40 else e.originalEvent.wheelDelta)
    up           = delta > 0

    prevent = ->
      e.stopPropagation()
      e.preventDefault()
      e.returnValue = false
      return false

    if (!up && -delta > scrollHeight - height - scrollTop)
      $(el).scrollTop scrollHeight
      return prevent()
    else if (up && delta > scrollTop)
      $(el).scrollTop(0)
      return prevent()

module.exports = Scroller