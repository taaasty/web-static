###* @jsx React.DOM ###

UserToolbarList = require './list'
PureRenderMixin = React.addons.PureRenderMixin

MOUSE_LEAVE_TIMEOUT = 300
TOOLBAR_CLOSED          = 'closed'
TOOLBAR_OPENED_BY_HOVER = 'openedByHover'
TOOLBAR_OPENED_BY_CLICK = 'openedByClick'

window.UserToolbar = React.createClass
  mixins: [TouchMixin, ComponentManipulationsMixin, PureRenderMixin, ScrollerMixin]

  propTypes:
    myTlogUrl:            React.PropTypes.string.isRequired
    newEntryUrl:          React.PropTypes.string
    newAnonymousEntryUrl: React.PropTypes.string
    favoritesUrl:         React.PropTypes.string
    privateEntriesUrl:    React.PropTypes.string
    logoutUrl:            React.PropTypes.string

  getInitialState: ->
    currentState: TOOLBAR_CLOSED

  componentWillUpdate: (nextProps, nextState) ->
    if @state.currentState isnt nextState.currentState
      switch nextState.currentState
        when TOOLBAR_OPENED_BY_CLICK then TastyEvents.emit TastyEvents.keys.user_toolbar_opened()
        when TOOLBAR_OPENED_BY_HOVER then TastyEvents.emit TastyEvents.keys.user_toolbar_opened()
        when TOOLBAR_CLOSED          then TastyEvents.emit TastyEvents.keys.user_toolbar_closed()

  render: ->
    toolbarClasses = React.addons.classSet {
      'toolbar':        true
      'toolbar--right': true
      'toolbar--nav':   true
      'state--open':    @isOpen()
    }

    return `<nav onClick={ this.handleClick }
                 onMouseEnter={ this.handleMouseEnter }
                 onMouseLeave={ this.handleMouseLeave }
                 className={ toolbarClasses }>
              <div className="toolbar__toggle">
                <i className="icon icon--menu" />
              </div>
              <div className="toolbar__popup">
                <div ref="scroller"
                     className="scroller scroller--dark scroller--toolbar">
                  <div className="scroller__pane js-scroller-pane">
                    <UserToolbarList
                        newEntryUrl={ this.props.newEntryUrl }
                        newAnonymousEntryUrl={ this.props.newAnonymousEntryUrl }
                        myTlogUrl={ this.props.myTlogUrl }
                        favoritesUrl={ this.props.favoritesUrl }
                        privateEntriesUrl={ this.props.privateEntriesUrl }
                        logoutUrl={ this.props.logoutUrl } />
                  </div>
                  <div className="scroller__track js-scroller-track">
                    <div className="scroller__bar js-scroller-bar" />
                  </div>
                </div>
              </div>
            </nav>`

  isOpen: -> @state.currentState isnt TOOLBAR_CLOSED

  handleClick: ->
    switch @state.currentState
      when TOOLBAR_CLOSED          then @setState(currentState: TOOLBAR_OPENED_BY_CLICK)
      when TOOLBAR_OPENED_BY_CLICK then @setState(currentState: TOOLBAR_CLOSED)
      when TOOLBAR_OPENED_BY_HOVER then @setState(currentState: TOOLBAR_CLOSED)
      else console.error? 'Unknown state.currentState', @state.currentState

  handleMouseEnter: ->
    clearTimeout @timeout if @timeout?

    if @state.currentState == TOOLBAR_CLOSED
      @setState(currentState: TOOLBAR_OPENED_BY_HOVER)

  handleMouseLeave: ->
    if @state.currentState == TOOLBAR_OPENED_BY_HOVER
      @timeout = setTimeout (=>
        @safeUpdateState(currentState: TOOLBAR_CLOSED)
      ), MOUSE_LEAVE_TIMEOUT