###* @jsx React.DOM ###

HERO_CLOSED = 'closed'
HERO_OPENED = 'opened'
HERO_OPENED_CLASS = 'hero-enabled'

window.HeroProfile = React.createClass

  getInitialState: ->
    currentState: HERO_CLOSED

  componentDidMount: ->
    @$win = $(window)
    @$htmlbody = $("html, body")
    @$body = $("body")
    @$hero = $(".js-hero")
    @$box = $(".js-hero-box")
    @$title = $(".js-hero-title")
    @$text = $(".js-hero-text")
    @$stats = $(".js-hero-stats")
    @$open = $(".js-hero-open")
    @$close = $(".js-hero-close")
    @noTransitionClass = "no--transition"

    # @$open.on "click", @open
    # @$close.on "click", @close
    $(window).on 'resize', @onResize
    # @load()

  render: ->
    heroClasses = React.addons.classSet {
      hero: true
      'js-hero': true
      'hero-enabled': @isOpen()
    }

    return `<div className={ heroClasses }>
              <CloseToolbar onClick={ this.close } />
              <div className="hero__overlay"></div>
              <div className="hero__gradient"></div>
              <div className="layout-constrain hero__box js-hero-box">
                <HeroProfileAvatar href="http://taaasty.ru/@lazy-cat"
                                   onClick={ this.open } />
                <span className="follow-status state--none"><i className="icon"></i></span>
                <HeroProfileHead />
                <HeroProfileActions />
              </div>
              <HeroProfileStats />
            </div>`

  open: (e) ->
    transitionEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend'

    unless @isOpen()
      e.preventDefault()
      Mousetrap.bind 'esc', @close

      @heightBox = @getHeightBox()
      @$htmlbody.scrollTop 0
      @$body.addClass HERO_OPENED_CLASS
      @setHeightWindowHero()
      @$stats.on transitionEnd, =>
        @setState currentState: HERO_OPENED
        @$stats.off transitionEnd
        @$win.on "scroll.hero", @close
        return

  close: (e) ->
    if @isOpen()
      Mousetrap.unbind 'esc', @close
      @$body.removeClass HERO_OPENED_CLASS
      @$hero.css "height", @heightBox
      @$win.off "scroll.hero"
      @setState currentState: HERO_CLOSED
      # @settings.onClose()

    e.preventDefault()
    return

  onResize: -> @setHeightWindowHero() if @isOpen()

  # load: ->
  #   unless @opened
  #     @heightBox = @getHeightBox()
  #     @$hero.addClass(@noTransitionClass).css "height", @heightBox
  #     setTimeout (->
  #       @$hero.removeClass @noTransitionClass
  #       return
  #     ).bind(this), 0
  #   return

  getHeightBox: ->
    @$box.outerHeight()

  setHeightWindowHero: ->
    $node = $( @getDOMNode() )
    $node.css 'height', $(window).height()

  isOpen: -> @state.currentState != HERO_CLOSED

# class window.Hero
#   # Elements
#   $win: null
#   $htmlbody: null
#   $body: null
#   $hero: null
#   $box: null
#   $title: null
#   $text: null
#   $stats: null
#   $close: null

#   # Variables
#   heightBox: null
#   opened: false

#   constructor: (options) ->
#     $.extend @settings, options  if options

#     opts = @settings
#     @$win = $(window)
#     @$htmlbody = $("html, body")
#     @$body = $("body")
#     @$hero = $(opts.hero)
#     @$box = $(opts.box)
#     @$title = $(opts.title)
#     @$text = $(opts.text)
#     @$stats = $(opts.stats)
#     @$open = $(opts.open)
#     @$close = $(opts.close)
#     @_initEvents()
#     return

#   _initEvents: ->
#     @$open.on "click", @open
#     @$close.on "click", @close
#     @$win.on("load", @load).on "resize", @resize
#     return

#   #.on("scroll", this.close.bind(this));
#   open: (e) =>
#     heroEnabledClass = @settings.heroEnabledClass
#     transitionEnd = "webkitTransitionEnd otransitionend oTransitionEnd " + "msTransitionEnd transitionend"
#     unless @opened
#       Mousetrap.bind 'esc', @close
#       @heightBox = @getHeightBox()
#       @$htmlbody.scrollTop 0
#       @$body.addClass heroEnabledClass
#       @setHeightWindowHero()
#       @$stats.on transitionEnd, =>
#         @opened = true
#         @$stats.off transitionEnd
#         @$win.on "scroll.hero", @close
#         return

#       @settings.onOpen()

#       e.preventDefault()
#     return

#   close: (e) =>
#     if @opened
#       Mousetrap.unbind 'esc', @close
#       heroEnabledClass = @settings.heroEnabledClass
#       @$body.removeClass heroEnabledClass
#       @$hero.css "height", @heightBox
#       @$win.off "scroll.hero"
#       @opened = false
#       @settings.onClose()

#     e.preventDefault()
#     return

#   resize: =>
#     @setHeightWindowHero()  if @opened
#     return

#   load: =>
#     opts = @settings
#     unless @opened
#       @heightBox = @getHeightBox()
#       @$hero.addClass(opts.noTransitionClass).css "height", @heightBox
#       setTimeout (->
#         @$hero.removeClass opts.noTransitionClass
#         return
#       ).bind(this), 0
#     return

#   getHeightBox: ->
#     @$box.outerHeight()

#   getHeightWindow: ->
#     @$win.height()

#   setHeightWindowHero: ->
#     @$hero.css "height", @$win.height()
#     return

# window.Hero::settings =
#   hero: ".js-hero"
#   box: ".js-hero-box"
#   title: ".js-hero-title"
#   text: ".js-hero-text"
#   stats: ".js-hero-stats"
#   open: ".js-hero-open"
#   close: ".js-hero-close"
#   heroEnabledClass: "hero-enabled" # TODO Есть ли возможность устанавливать его не на body, а только на hero?
#   noTransitionClass: "no--transition"
#   onOpen: ->
#   onClose: ->

# window.Hero.start = ->
#   win = $ window

#   if Modernizr.touch
#     console.log 'touch'
#     new Hero
#       open: ".js-hero-open:not(.js-userbar-toggle)"
#       onOpen: =>
#         win.trigger "hidePopup"
#         return

#       onClose: =>
#         win.trigger "hidePopup"
#         return

#     $(".js-userbar-toggle").on "click", ->
#       $(".js-userbar").toggleClass "state--active"
#       false

#   else
#     new Hero()
