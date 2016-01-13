CurrentUserStore    = require '../../stores/currentUser'
ConnectStoreMixin   = require '../../../../shared/react/mixins/connectStore'
BrowserHelpers      = require '../../../../shared/helpers/browser'
HeroTlogAvatar      = require './tlog/avatar'
HeroTlogHead        = require './tlog/head'
HeroTlogActions     = require './tlog/actions'
HeroTlogStats       = require './tlog/stats'
HeroTlogCloseButton = require './tlog/buttons/close'
React = require 'react';
{ createClass, PropTypes } = React;

CLOSE_STATE = 'close'
OPEN_STATE  = 'open'

_screenOrientation = null
_initialHeroHeight = null
_openHeroHeight    = null

HeroTlog = createClass
  displayName: 'HeroTlog'
  mixins: [ConnectStoreMixin(CurrentUserStore)]

  propTypes:
    tlog: PropTypes.object.isRequired

  getInitialState: ->
    currentState: CLOSE_STATE

  componentDidMount: ->
    _initialHeroHeight = this.refs.container.offsetHeight

    window.addEventListener 'resize', @onResize

  componentWillUnmount: ->
    window.removeEventListener 'resize', @onResize

  render: ->
    <div
      className="hero"
      ref="container"
      style={ @getHeroStyles() }
    >
      <HeroTlogCloseButton onClick={ @close } />
      <div className="hero__overlay" />
      <div className="hero__gradient" />
      <div className="hero__content">
        <HeroTlogAvatar
            user={ @state.user }
            author={ @props.tlog.author }
            status={ @props.tlog.my_relationship }
            onClick={ @handleAvatarClick } />
        <HeroTlogHead author={ @props.tlog.author } />
        <HeroTlogActions
            user={ @state.user }
            author={ @props.tlog.author }
            status={ @props.tlog.my_relationship } />
      </div>
      <HeroTlogStats
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