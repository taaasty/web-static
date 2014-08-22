###* @jsx React.DOM ###

window.ScreenViewer = React.createClass
  propTypes:
    text:  React.PropTypes.string
    screens: React.PropTypes.array.isRequired

  getInitialState: ->
    isReady:       false
    activeScreen:  0
    numTimeout:    null

  componentDidMount: ->
    @loadedScreens = {}

  componentWillUpdate: (nextProps, nextState) ->
    if nextState.numTimeout isnt "null" and nextState.isReady
      console.log @loadedScreens;
      @onTimeout()

  componentWillReceiveProps: (nextProps) ->
    console.log "componentWillReceiveProps"

  render: ->
    that = @

    screenViewerClasses = React.addons.classSet {
      'screen-viewer': true
      'state--ready':  @state.isReady
    }

    if @props.text
      screenViewerText = `<div className="screen-viewer__text">{ this.props.text }</div>`

    screenViewerScreens = @props.screens.map (screen, i) ->
      `<ScreenViewerItem index={ i }
                         srcImg={ screen.srcImg }
                         user={ screen.user }
                         onSuccess={ that.onSetReadiness } />`

    return `<div className={ screenViewerClasses }>
              <div className="screen-viewer__loader">
                <span className="spinner spinner--24x24">
                  <span className="spinner__icon"></span>
                </span>
              </div>
              { screenViewerText }
              <div className="screen-viewer__box">{ screenViewerScreens }</div>
            </div>`

  onSetReadiness: (bool, index) ->
    if bool
      @setState isReady: bool
      @loadedScreens[index] = true

  onTimeout: ->
    clearTimeout @state.numTimeout
    @state.numTimeout = setTimeout (->
      @setState activeScreen: 1
      return
    ).bind(this), 8000