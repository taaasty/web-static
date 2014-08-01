###* @jsx React.DOM ###

window.Hero = React.createClass

  render: ->
    `<div class="hero js-hero">
      <div class="hero__overlay"></div>
      <div class="hero__gradient"></div>
      <div class="layout-constrain hero__box js-hero-box">
        <div class="hero__avatar js-hero-open">
          <span class="avatar" style="background-image: url(http://thumbor0.tasty0.ru/unsafe/200x200/userpic/1d/f8/2_large.jpg);"></span>
        </div>
        <span class="follow-status"><i class="icon"></i></span>
        <div class="hero__mask"></div>
        <div class="hero__head">
          <div class="hero__title js-hero-open js-hero-title"><span>Madworld</span></div>
        </div>
        <div class="hero__text js-hero-text"><span>Прекрасная жизнь</span></div>
        <div class="hero__actions">
          <div data-react-class="FollowButton" data-react-props="{&quot;tlogId&quot;:5881}"><button class="follow-button" data-reactid=".2">ошибка</button></div>
        </div>
      </div>
      <div class="hero__stats js-hero-stats">
        <div class="hero__stats-list">
          <div class="hero__stats-item">
            <a class="hero__stats-link js-subscribed-by-toggle" href="#" title="22 подписчика" data-popup-selector=".js-subscribed-by">
              <strong>22</strong> подписчика
            </a>
          </div>
          <div class="hero__stats-item">
            <a class="hero__stats-link js-subscribed-to-toggle" href="#" title="103 подписан" data-popup-selector=".js-subscribed-to">
              <strong>103</strong> подписан(а)
            </a>
          </div>
          <div class="hero__stats-item">
            <a class="hero__stats-link" href="#" title="92 в избранном">
              <strong>92</strong> в избранном
            </a>
          </div>
          <div class="hero__stats-item">
            <a class="hero__stats-link" href="#" title="0 комментариев">
              <strong>0</strong> комментариев
            </a>
          </div>
          <div class="hero__stats-item">
            <a class="hero__stats-link" href="#" title="22 скрытые">
              <strong>22</strong> скрытые
            </a>
          </div>
          <div class="hero__stats-item">
            <a class="hero__stats-link js-tags-toggle" href="#" title="45 тегов" data-popup-selector=".js-tags">
              <strong>45</strong> тегов
            </a>
          </div>
        </div>
      </div>
  </div>`

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
