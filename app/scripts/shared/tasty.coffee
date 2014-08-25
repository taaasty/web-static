$ ->
  if Modernizr?.touch
    $(".js-dropdown").dropdown()

  $(".js-alert-close").click -> $(".js-alert").hide()

  $('textarea[tastyAutosize]').autosize append:''
  $('input[tastyAutosize]').autosizeInput space: 0
  $('[collage]').collage margin: 0

  # TODO Разобраться с onMousewheel
  #$(".js-scroller-pane").on "mousewheel", TastyUtils.onMousewheel

  # Продлеваем бакграунт в тлоге если он коротки (например тлог пустой)
  # https://github.com/BrandyMint/mmm-tasty-static/issues/21
  height = $(window).height() - 100
  $('[min-page-height]').css 'min-height', height + 'px'

  TastyUtils.centerHorizontally ".js-horizontal-centering"

  # wiselinks подгружает native.history которая вместо hash меняет url. Это хорошо
  # но backbone такого обращния не понимает
  #window.wiselinks = new Wiselinks $('#js-wiselinks-content')


# Эта функция запускается из рельс в конце html. Ей в качестве параметра
# передается user
#
window.Tasty =
  start: (options) ->
    #console.debug? "Залогинен пользователь", user.slug if user?
    #new GuidePopup()
    #
    #TastyData.user = new Backbone.Model options.user if options.user?

    # нет необходимости, jquery_ujs это делает сам
    # 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    headers = {}
    headers['X-User-Token'] = options.access_token if options.access_token?

    TastyUtils.showFlashes options.flashes

    Honeybadger?.setContext user_id: options.user?.id

    $.ajaxSetup
      headers: headers
      cache:   true
      xhrFields:
        withCredentials: true
      error: (e) -> TastyNotifyController.errorResponse e

    ReactApp.start()
