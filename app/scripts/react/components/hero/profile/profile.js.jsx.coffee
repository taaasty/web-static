###* @jsx React.DOM ###

HERO_CLOSED = 'closed'
HERO_OPENED = 'opened'
HERO_OPENED_CLASS = 'hero-enabled'

window.HeroProfile = React.createClass

  propTypes:
    user:         React.PropTypes.object.isRequired
    relationship: React.PropTypes.object.isRequired
    stats:        React.PropTypes.object.isRequired

  getInitialState: ->
    currentState: HERO_CLOSED

  componentDidMount: ->
    @$hero = $( @getDOMNode() )
    @heroClosedHeight = @$hero.height()

    @setInitialHeroHeight()

    $(window).on 'resize', @onResize
    $(window).on 'scroll', @scrollFade

  shouldComponentUpdate: (nextProps, nextState) ->
    @state.currentState != nextState.currentState

  componentWillUnmount: ->
    $(window).off 'resize', @onResize
    $(window).off 'scroll', @scrollFade

  render: ->
    `<div className="hero hero-profile">
      <CloseToolbar onClick={ this.close } />
      <div className="hero__overlay"></div>
      <div className="hero__gradient"></div>
      <div className="layout-constrain hero__box" ref="heroBox">
        <HeroProfileAvatar user={ this.props.user }
                           onClick={ this.open } />
        <span className="follow-status state--none"><i className="icon"></i></span>
        <HeroProfileHead user={ this.props.user } />
        <div className="hero__actions">
          <FollowButton tlogId={ this.props.user.id }
                        relationship={ this.props.relationship } />
        </div>
      </div>
      <HeroProfileStats stats={ this.props.stats } />
    </div>`

  open: (e) ->
    transitionEnd = 'webkitTransitionEnd otransitionend oTransitionEnd' +
                    'msTransitionEnd transitionend'

    unless @isOpen()
      e.preventDefault()
      Mousetrap.bind 'esc', @close
      @setHeroWindowHeight()
      $('body').addClass(HERO_OPENED_CLASS).scrollTop 0

      @$hero.on transitionEnd, =>
        @setState currentState: HERO_OPENED
        $(window).on 'scroll.hero', @close
        @$hero.off transitionEnd

  close: ->
    if @isOpen()
      @setState currentState: HERO_CLOSED
      Mousetrap.unbind 'esc', @close
      $(window).off 'scroll.hero'

      @restoreInitialHeroHeight()
      $('body').removeClass HERO_OPENED_CLASS

  setInitialHeroHeight: ->
    transitionEnd = 'webkitTransitionEnd otransitionend oTransitionEnd' +
                    'msTransitionEnd transitionend'

    @$hero.on transitionEnd, =>
      $(document).trigger 'domChanged'
      @$hero.off transitionEnd

    @initialHeroHeight = @$hero.height()
    @$hero.css 'height', @heroClosedHeight

  restoreInitialHeroHeight: -> @$hero.css 'height', @heroClosedHeight

  setHeroWindowHeight: -> @$hero.css 'height', $(window).height()

  scrollFade: ->
    $heroBox  = $( @refs.heroBox.getDOMNode() )
    height    = $heroBox.outerHeight() / 1.5
    scrollTop = $(window).scrollTop()

    # Не производим пересчёт значений, если hero уже вне поля видимости
    if scrollTop < @heroClosedHeight
      scrollTop = 0 if scrollTop < 0

      $heroBox.css
        'transform':         'translateY(' + scrollTop + 'px)'
        '-ms-transform':     'translateY(' + scrollTop + 'px)'
        '-webkit-transform': 'translateY(' + scrollTop + 'px)'
        'opacity':           Math.max(1 - scrollTop / height, 0)

  onResize: -> @setHeroWindowHeight() if @isOpen()

  isOpen: -> @state.currentState != HERO_CLOSED