###* @jsx React.DOM ###

ReactTransitionGroup = React.addons.TransitionGroup
TICK = 17

EVENT_NAME_MAP = {
  transitionend: {
    'transition':       'transitionend'
    'WebkitTransition': 'webkitTransitionEnd'
    'MozTransition':    'mozTransitionEnd'
    'OTransition':      'oTransitionEnd'
    'msTransition':     'MSTransitionEnd'
  }

  animationend: {
    'animation':       'animationend'
    'WebkitAnimation': 'webkitAnimationEnd'
    'MozAnimation':    'mozAnimationEnd'
    'OAnimation':      'oAnimationEnd'
    'msAnimation':     'MSAnimationEnd'
  }
}

endEvents = []

(detectEvents = ->
  testEl = document.createElement 'div'
  style  = testEl.style

  delete EVENT_NAME_MAP.animationend.animation   unless "AnimationEvent" of window
  delete EVENT_NAME_MAP.transitionend.transition unless "TransitionEvent" of window

  for baseEventName of EVENT_NAME_MAP
    if EVENT_NAME_MAP.hasOwnProperty baseEventName
      baseEvents = EVENT_NAME_MAP[baseEventName]

      for styleName of baseEvents
        if styleName of style
          endEvents.push baseEvents[styleName]
          break
  return
)()

animationSupported = ->
  endEvents.length != 0

animationAllowed = ->
  # Под запрет попадают:
  # - Firefox < 34

  browser        = bowser.browser
  browserName    = browser.name
  browserVersion = parseInt browser.version

  return false if browserName is 'Firefox' && browserVersion < 34

  true

TimeoutTransitionGroupChild = React.createClass

  transition: (animationType, finishCallback) ->
    return finishCallback?() unless animationAllowed()

    node = @getDOMNode()
    className = @props.name + '-' + animationType
    activeClassName = className + '-active'

    endListener = ->
      $(node).removeClass className
      $(node).removeClass activeClassName

      finishCallback?()

    unless animationSupported()
      endListener()
    else
      switch animationType
        when 'enter'
          @animationTimeout = setTimeout(endListener, @props.enterTimeout)
        when 'leave'
          @animationTimeout = setTimeout(endListener, @props.leaveTimeout)

    $(node).addClass className
    @queueClass activeClassName

  queueClass: (className) ->
    @classNameQueue.push className

    unless @timeout
      @timeout = setTimeout(@flushClassNameQueue, TICK)

  flushClassNameQueue: ->
    if @isMounted()
      $(@getDOMNode()).addClass @classNameQueue.join(' ')

    @classNameQueue.length = 0
    @timeout = null

  componentWillMount: ->
    @classNameQueue = []

  componentWillUnmount: ->
    clearTimeout @timeout if @timeout?
    
    clearTimeout @animationTimeout if @animationTimeout?

  componentWillEnter: (done) ->
    if @props.enter then @transition('enter', done) else done()

  componentWillLeave: (done) ->
    if @props.leave then @transition('leave', done) else done()

  render: ->
    React.Children.only @props.children

window.TimeoutTransitionGroup = React.createClass

  propTypes:
    enterTimeout:    React.PropTypes.number.isRequired
    leaveTimeout:    React.PropTypes.number.isRequired
    transitionName:  React.PropTypes.string.isRequired
    transitionEnter: React.PropTypes.bool
    transitionLeave: React.PropTypes.bool

  getDefaultProps: ->
    transitionEnter: true
    transitionLeave: true

  _wrapChild: (child) ->
    TimeoutTransitionGroupChild {
      enterTimeout: @props.enterTimeout
      leaveTimeout: @props.leaveTimeout
      name:         @props.transitionName
      enter:        @props.transitionEnter
      leave:        @props.transitionLeave
    }, child

  render: ->
    @transferPropsTo(
      `<ReactTransitionGroup childFactory={ this._wrapChild }>
         { this.props.children }
       </ReactTransitionGroup>`
    )