###* @jsx React.DOM ###

MOUSE_LEAVE_TIMEOUT = 300
TOOLBAR_CLOSED = 'closed'
TOOLBAR_OPENED_BY_HOVER = 'openedByHover'
TOOLBAR_OPENED_BY_CLICK = 'openedByClick'

window.FeedToolbar = React.createClass
  mixins: [TouchMixin, ComponentManipulationsMixin, ScrollerMixin]

  propTypes:
    friendsUrl:   React.PropTypes.string
    liveUrl:      React.PropTypes.string.isRequired
    bestUrl:      React.PropTypes.string.isRequired
    anonymousUrl: React.PropTypes.string.isRequired

  getInitialState: ->
    currentState: TOOLBAR_CLOSED

  componentWillUnmount: ->
    clearTimeout @timeout if @timeout

  render: ->
    feedList = []
    toolbarClasses = React.addons.classSet {
      'toolbar':      true
      'toolbar--nav': true
      'state--open':  @isOpen()
    }

    if @props.friendsUrl
      feedList.push `<ToolbarItem href={ this.props.friendsUrl }
                                  icon="icon--friends"
                                  title="Подписки"
                                  key="friends" />`
    feedList.push `<ToolbarItem href={ this.props.liveUrl }
                                icon="icon--wave"
                                title="Прямой эфир"
                                key="live" />`
    feedList.push `<ToolbarItem href={ this.props.bestUrl }
                                icon="icon--fire"
                                title="Лучшее"
                                key="best" />`
    feedList.push `<ToolbarItem href={ this.props.anonymousUrl }
                                icon="icon--anonymous"
                                title="Анонимки"
                                key="anonymous" />`

    feedList.push `<ToolbarItem href={ Routes.people_path() }
                                icon="icon--friends"
                                title="Люди"
                                key="people" />`

    return `<nav onClick={ this.onClick }
                 onMouseEnter={ this.onMouseEnter }
                 onMouseLeave={ this.onMouseLeave }
                 className={ toolbarClasses }>
              <div className="toolbar__toggle">
                <i className="icon icon--ribbon"></i>
              </div>
              <div className="toolbar__popup" data-element="dropdown-menu">
                <div className="scroller scroller--dark scroller--toolbar" ref="scroller">
                  <div className="scroller__pane js-scroller-pane">
                    <ul className="toolbar__popup-list">{ feedList }</ul>
                  </div>
                  <div className="scroller__track js-scroller-track">
                      <div className="scroller__bar js-scroller-bar"></div>
                  </div>
                </div>
              </div>
            </nav>`

  onClick: (e) ->
    switch @state.currentState
      when TOOLBAR_CLOSED          then @setState currentState: TOOLBAR_OPENED_BY_CLICK
      when TOOLBAR_OPENED_BY_CLICK then @setState currentState: TOOLBAR_CLOSED
      when TOOLBAR_OPENED_BY_HOVER then @setState currentState: TOOLBAR_CLOSED
      else console.error? "Unknown state.currentState", @state.currentState

  onMouseEnter: (e) ->
    clearTimeout @timeout if @timeout?

    if @state.currentState == TOOLBAR_CLOSED
      @setState currentState: TOOLBAR_OPENED_BY_HOVER

  onMouseLeave: ->
    if @state.currentState == TOOLBAR_OPENED_BY_HOVER
      @timeout = setTimeout ( =>
        @safeUpdateState currentState: TOOLBAR_CLOSED
      ), MOUSE_LEAVE_TIMEOUT

  isOpen: -> @state.currentState != TOOLBAR_CLOSED
