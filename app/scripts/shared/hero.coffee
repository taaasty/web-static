class window.Hero
  # Elements
  $win: null
  $htmlbody: null
  $body: null
  $hero: null
  $box: null
  $title: null
  $text: null
  $stats: null
  $close: null

  # Variables
  heightBox: null
  opened: false

  constructor: (options) ->
    $.extend @settings, options  if options

    opts = @settings
    @$win = $(window)
    @$htmlbody = $("html, body")
    @$body = $("body")
    @$hero = $(opts.hero)
    @$box = $(opts.box)
    @$title = $(opts.title)
    @$text = $(opts.text)
    @$stats = $(opts.stats)
    @$open = $(opts.open)
    @$close = $(opts.close)
    @_initEvents()
    return

  _initEvents: ->
    @$open.on "click", @open
    @$close.on "click", @close
    @$win.on("load", @load).on "resize", @resize
    return

  #.on("scroll", this.close.bind(this));
  open: (e) =>
    heroEnabledClass = @settings.heroEnabledClass
    transitionEnd = "webkitTransitionEnd otransitionend oTransitionEnd " + "msTransitionEnd transitionend"
    unless @opened
      Mousetrap.bind 'esc', @close
      @heightBox = @getHeightBox()
      @$htmlbody.scrollTop 0
      @$body.addClass heroEnabledClass
      @setHeightWindowHero()
      @$stats.on transitionEnd, =>
        @opened = true
        @$stats.off transitionEnd
        @$win.on "scroll.hero", @close
        return

      @settings.onOpen()

      e.preventDefault()
    return

  close: (e) =>
    if @opened
      Mousetrap.unbind 'esc', @close
      heroEnabledClass = @settings.heroEnabledClass
      @$body.removeClass heroEnabledClass
      @$hero.css "height", @heightBox
      @$win.off "scroll.hero"
      @opened = false
      @settings.onClose()

    e.preventDefault()
    return

  resize: =>
    @setHeightWindowHero()  if @opened
    return

  load: =>
    opts = @settings
    unless @opened
      @heightBox = @getHeightBox()
      @$hero.addClass(opts.noTransitionClass).css "height", @heightBox
      setTimeout (->
        @$hero.removeClass opts.noTransitionClass
        return
      ).bind(this), 0
    return

  getHeightBox: ->
    @$box.outerHeight()

  getHeightWindow: ->
    @$win.height()

  setHeightWindowHero: ->
    @$hero.css "height", @$win.height()
    return

window.Hero::settings =
  hero: ".js-hero"
  box: ".js-hero-box"
  title: ".js-hero-title"
  text: ".js-hero-text"
  stats: ".js-hero-stats"
  open: ".js-hero-open"
  close: ".js-hero-close"
  heroEnabledClass: "hero-enabled" # TODO Есть ли возможность устанавливать его не на body, а только на hero?
  noTransitionClass: "no--transition"
  onOpen: ->
  onClose: ->

window.Hero.start = ->
  win = $ window

  if Modernizr.touch
    console.log 'touch'
    new Hero
      open: ".js-hero-open:not(.js-userbar-toggle)"
      onOpen: =>
        win.trigger "hidePopup"
        return

      onClose: =>
        win.trigger "hidePopup"
        return

    $(".js-userbar-toggle").on "click", ->
      $(".js-userbar").toggleClass "state--active"
      false

  else
    new Hero
      onOpen: =>
        win.trigger "hidePopup"
        return

      onClose: =>
        win.trigger "hidePopup"
        return

