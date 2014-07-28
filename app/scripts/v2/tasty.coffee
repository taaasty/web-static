#= require ./tasty.utils
#= require ./popup

window.Tasty = 
  checkBackground: false
  win: null
  doc: null

  init: ->
    @initDomEvents()
    @setupVideos()
    @setupFeedHeaderScrolls()
    #@bindEntryDelete()
    $(".js-post-delete").on "click", @confirmAndDeleteEntry

    $(".js-alert-close").click -> $(".js-alert").hide()

    # Перевести на роуты
    #if $("body").hasClass("layout--feed")
      #@setupLiveFeed()
    #if $("body").hasClass("layout--tlog")
      #@setupTlog()

    TastyUtils.centerHorizontally ".js-horizontal-centering"

  hideEntryElement: (entryElement) ->
    $(entryElement).fadeOut 500, ->
      $(entryElement).slideUp 200, ->
        $(entryElement).remove()

  setupFeedHeaderScrolls: ->
    win = $(window)
    hero = $(".hero")
    heroBox = hero.find(".hero__box")

    win.on 'load', ->
      win.on 'scroll', ->
        TastyUtils.scrollFade hero, heroBox

  confirmAndDeleteEntry: (event) =>
    event.preventDefault()

    $link = $ event.currentTarget
    TastyConfirm.show
      message: $link.attr('data-message') || "Вы действительно хотите удалить запись?<br />Её нельзя будет восстановить."
      button:  $link.attr('data-button') || "Удалить запись"
      callback: =>
        $.ajax
          url:    $link.attr('href')
          method: $link.attr('data-method') || 'GET'
          data:   $link.attr('data-params')
          success: (e, data) =>
            # Случае если мы в ленте - редиректим, если не в ленте - не редиректим

            redirect_url = $link.attr('data-success-url')
            if redirect_url?
              window.location.href = redirect_url
            else
              Tasty.hideEntryElement $link.parents('.js-post')


        #find post div

    return false
      #error: (error) ->
        #TastyUtils.notify "error", error.message
        #return

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

  setupTlog: ->
    @setupFeed()
    @checkBackground = $("body").hasClass("tlog-headercolor-auto")
    bgcolor = $(".b-page .b-cover").css("background-color")
    if @checkBackground
      @backgroundCheck = BackgroundCheck.init(
        targets: ".hero__mask"
        images: ".js-cover"
        maxDuration: 1000
        windowEvents: false
        debug: false
      )
    return

  setupFeed: ->
    @setupVideos()

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
