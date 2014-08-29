window.TastyUtils =

  showFlashes: (flashes=[]) ->
    _.each flashes, (flash) ->
      TastyNotifyController.notify flash[0], flash[1]

  centerHorizontally: (element) ->
    $(element).each ->
      e = $(this)
      e.css "margin-left", -(e.width() / 2)
      return

    return

  scrollFade: (container, element) ->
    height    = container.outerHeight() - element.outerHeight() / 2
    scrollTop = $(window).scrollTop()

    element.css
      "margin-top": scrollTop
      "opacity":    Math.max(1 - scrollTop / height, 0)

  onMousewheel: (e, d) ->
    e.stopPropagation()
    e.preventDefault()  if (@scrollTop is (@scrollHeight - @offsetHeight) and d < 0) or (@scrollTop is 0 and d > 0)
    return

  scrollToElement: (el) ->
    setTimeout (->
      scrollTo(0, $(el).offset().top)
    ), 0

  formatNumber: (rawNumber, round, delimiter = " ") ->
    number = parseInt rawNumber

    if round?
      number = Math.ceil( number / round ) * round

    number.toString().replace /\B(?=(\d{3})+(?!\d))/g, delimiter