CurrentUserStore  = require '../../stores/currentUser'
ConnectStoreMixin = require '../../mixins/connectStore'
BrowserHelpers    = require '../../../../shared/helpers/browser'
HeroAvatar        = require './tlog/avatar'
HeroHead          = require './tlog/head'
HeroActions       = require './tlog/actions'
HeroStats         = require './tlog/stats'
HeroCloseButton   = require './tlog/buttons/close'
{ PropTypes } = React

CLOSE_STATE = 'close'
OPEN_STATE  = 'open'

_screenOrientation = null
_initialHeroHeight = null
_openHeroHeight    = null

HeroTlog = React.createClass
  displayName: 'HeroTlog'
  mixins: [ConnectStoreMixin(CurrentUserStore)]

  propTypes:
    tlog: PropTypes.object.isRequired

  getInitialState: ->
    currentState: CLOSE_STATE

  componentDidMount: ->
    _initialHeroHeight = @getDOMNode().offsetHeight

    window.addEventListener 'resize', @onResize

  componentWillUnmount: ->
    window.removeEventListener 'resize', @onResize

  render: ->
    <div style={ @getHeroStyles() }
         className="hero">
      <HeroCloseButton onClick={ @close } />
      <div className="hero__overlay" />
      <div className="hero__gradient" />
      <div className="hero__content">
        <HeroAvatar
            user={ @state.user }
            author={ @props.tlog.author }
            status={ @props.tlog.my_relationship }
            onClick={ @handleAvatarClick } />
        <HeroHead author={ @props.tlog.author } />
        <HeroActions
            user={ @state.user }
            author={ @props.tlog.author }
            status={ @props.tlog.my_relationship } />
      </div>
      <HeroStats
          author={ @props.tlog.author }
          stats={ @props.tlog.stats } />
    </div>

  isOpenState: -> @state.currentState is OPEN_STATE

  activateOpenState:  -> @setState(currentState: OPEN_STATE)
  activateCloseState: -> @setState(currentState: CLOSE_STATE)

  open: ->
    html = document.querySelector 'html'
    html.classList.add 'hero-enabled'

    _openHeroHeight = window.innerHeight
    document.body.style.height = _openHeroHeight + 'px'
    document.body.scrollTop = document.documentElement.scrollTop = 0

    @activateOpenState()

  close: ->
    html = document.querySelector 'html'
    html.classList.remove 'hero-enabled'

    _screenOrientation = null
    document.body.style.height = ''

    @activateCloseState()

  getHeroStyles: ->
    #TODO: Get optimized background through ThumborService
    backgroundUrl = @props.tlog.design?.background_url
    height = if @isOpenState() then _openHeroHeight else _initialHeroHeight

    backgroundImage: "url('#{ backgroundUrl }')"
    height: height

  handleAvatarClick: ->
    @open() unless @isOpenState()

  onResize: ->
    html = document.querySelector 'html'
    currentOrientation = BrowserHelpers.getCurrentOrientation()

    if @isOpenState() and _screenOrientation isnt currentOrientation
      _screenOrientation = currentOrientation
      _openHeroHeight    = window.innerHeight

      document.body.style.height = _openHeroHeight + 'px'
      @forceUpdate()

  getStateFromStore: ->
    user: CurrentUserStore.getUser()

module.exports = HeroTlog