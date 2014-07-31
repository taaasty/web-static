window.Tasty = 
  checkBackground: false
  win: null
  doc: null

  init: ->
    @initDomEvents()
    @setupVideos()
    @setupFeedHeaderScrolls()
    #@bindEntryDelete()

    $(".js-alert-close").click -> $(".js-alert").hide()

    TastyUtils.centerHorizontally ".js-horizontal-centering"

  setupFeedHeaderScrolls: ->
    win = $(window)
    hero = $(".hero")
    heroBox = hero.find(".hero__box")

    win.on 'load', ->
      win.on 'scroll', ->
        TastyUtils.scrollFade hero, heroBox

  setupVideos: ->
    #$(".video .video__overlay").click ->
    $(".js-video-start").click ->
      $embed = $(@).parents(".video").find(".video__embed")
      $embed.show().append $embed.data("frame")
      $embed.width('100%')
      $embed.height('100%')
      $iframe = $embed.find("iframe")
      $iframe.attr width:   $embed.data('width')  || $embed.width()
      $iframe.attr height:  $embed.data('height') || $embed.height()

  initDomEvents: =>
    @win = $(window)
    @doc = $(document)
    @win.load   @onLoad
    @win.resize @onResize

  onResize: =>
    BackgroundCheck.refresh()  if @checkBackground
    return

  onLoad: =>
    TastyUtils.centerHorizontally ".js-horizontal-centering"
    BackgroundCheck.refresh()  if @checkBackground
    return