HeroAvatar      = require './avatar'
HeroHead        = require './head'
HeroActions     = require './actions'
HeroStats       = require './stats'
HeroCloseButton = require './buttons/close'
{ PropTypes } = React

CLOSE_STATE = 'close'
OPEN_STATE  = 'open'

_screenOrientation = window.orientation
_initialHeroHeight = null
_openHeroHeight    = null

Hero = React.createClass

  propTypes:
    user:         PropTypes.object.isRequired
    stats:        PropTypes.object.isRequired
    relationship: PropTypes.object

  getInitialState: ->
    currentState: CLOSE_STATE

  componentDidMount: ->
    _initialHeroHeight = @getDOMNode().offsetHeight

    window.addEventListener 'resize', @onResize

  componentWillUnmount: ->
    window.removeEventListener 'resize', @onResize

  render: ->
    <div style={ this._getHeroStyles() }
         className="hero">
      <HeroCloseButton onClick={ this.close } />
      <div className="hero__overlay" />
      <div className="hero__gradient" />
      <div className="hero__content">
        <HeroAvatar
            user={ this.props.user }
            relationship={ this.props.relationship }
            onClick={ this.handleAvatarClick } />
        <HeroHead user={ this.props.user } />
        <HeroActions
            user={ this.props.user }
            relationship={ this.props.relationship } />
      </div>
      <HeroStats
          user={ this.props.user }
          stats={ this.props.stats } />
    </div>

  isOpenState: -> @state.currentState is OPEN_STATE

  activateOpenState:  -> @setState(currentState: OPEN_STATE)
  activateCloseState: -> @setState(currentState: CLOSE_STATE)

  open: ->
    html            = document.querySelector 'html'
    _openHeroHeight = window.innerHeight

    html.classList.add 'hero-enabled'
    html.style.height = _openHeroHeight + 'px'
    document.body.scrollTop = document.documentElement.scrollTop = 0

    @activateOpenState()

  close: ->
    html = document.querySelector 'html'
    html.classList.remove 'hero-enabled'

    @activateCloseState()

  _getHeroStyles: ->
    #TODO: Get optimized background through ThumborService
    backgroundUrl = @props.user.design?.background_url

    height = if @isOpenState() then _openHeroHeight else _initialHeroHeight

    'background-image': "url(#{ backgroundUrl })"
    'height': height

  handleAvatarClick: ->
    @open() unless @isOpenState()

  onResize: ->
    html = document.querySelector 'html'

    if _screenOrientation isnt window.orientation
      _screenOrientation = window.orientation
      _openHeroHeight    = window.innerHeight

      html.style.height = _openHeroHeight + 'px'
      @forceUpdate()

module.exports = Hero