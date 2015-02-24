require './settings'
require './bundle'
require './resources/gon'

mockUser = require './data/user'

$ ->
  if localStorage.getItem('userLogged') is "true"
    if localStorage.getItem 'userToken'
      mockUser.api_key.access_token = localStorage.getItem 'userToken'

    if localStorage.getItem 'userId'
      mockUser.id = parseInt( localStorage.getItem('userId') )

    window.Tasty.start
      user: mockUser
      locale: 'ru'
  else
    console.debug? 'Без пользователя'
    window.Tasty.start()

  # Эксперимент с навигацией
  mainToolbar = document.querySelector('.toolbar--main')
  mainToolbarToggle = mainToolbar.querySelector('.toolbar__toggle')
  mainToolbarScroller = mainToolbar.querySelector('.scroller')

  $(mainToolbarScroller).baron
      scroller: '.scroller__pane'
      bar:      '.scroller__bar'
      track:    '.scroller__track'
      barOnCls: 'scroller--tracked'
      pause:    0

  mainToolbarToggle.onclick = ->
    document.body.classList.toggle('main-toolbar-open');

  $('.toolbar--main .toolbar__nav-item').on 'mouseenter', ->
    $(this).find('.toolbar__subnav').stop().slideDown(300)

  $('.toolbar--main .toolbar__nav').on 'mouseleave', ->
    $(this).find('.toolbar__subnav').stop().slideUp(300)

  # Тултип для шаринга
  $("[tooltip]").tooltip()

  # В попапе настроек дизайна
  $("[design-settings-tooltip]").tooltip({
    delay: {
      show: 200
    }
  })

  # Только демонстрация настроек дизайна
  $('.design-settings').on 'change', (e) ->
    name = e.target.name.toLowerCase()

    classes = document.body.className.split(" ").filter((class_) ->
      class_.lastIndexOf(name, 0) isnt 0
    )

    newClass = (name + "-" + e.target.value)

    if (e.target.type is 'checkbox' && !e.target.checked) || e.target.type is 'radio'
      classes.push(newClass)

    document.body.className = $.trim(classes.join(" "))

  $('.scroller--design').baron
    scroller: '> .js-scroller-pane'
    bar:      '> .js-scroller-track > .js-scroller-bar'
    track:    '> .js-scroller-track'
    barOnCls: 'scroller--tracked'
    pause:    0

  # Слайдер
  # http://stackoverflow.com/questions/7212102/detect-with-javascript-or-jquery-if-css-transform-2d-is-available
  getSupportedTransform = ->
    prefixes = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' ')
    i = 0

    while i < prefixes.length
      return prefixes[i] if document.createElement('div').style[prefixes[i]] isnt `undefined`
      i++
    false

  supportCSSTransform = getSupportedTransform()

  $('.slider').each ->
    $slider = $(this)
    $main = $slider.find('.slider__main')
    $list = $slider.find('.slider__list')

    pos = 0

    return true if $list.width() < $main.width()

    btnPrev = $('<div />', {'class': 'slider__btn slider__btn--left'})
    btnNext = $('<div />', {'class': 'slider__btn slider__btn--right'})
    $slider
      .append(btnPrev, btnNext)
      .addClass '__inited __leftlimit'

    setPosition = (value) ->
      unless supportCSSTransform
        $list.css
          left: value
      else
        $list.css
          WebkitTransform: 'translateX(' + value + 'px)',
          MozTransform:    'translateX(' + value + 'px)',
          msTransform:     'translateX(' + value + 'px)',
          OTransform:      'translateX(' + value + 'px)',
          transform:       'translateX(' + value + 'px)'

    setPosition(0)

    btnNext.on 'click', ->
      shift = $main.width() - 40

      return true if pos + shift >= $list.width()

      if pos + shift >= $list.width() - $main.width()
        $slider.addClass '__rightlimit'

      if pos + shift >= $list.width() - $main.width()
        pos = $list.width() - $main.width()
      else
        pos = pos + shift

      $slider.removeClass '__leftlimit'
      setPosition(pos * -1)

    btnPrev.on 'click', ->
      shift = $main.width() - 40

      if pos == 0
        return true

      if pos - shift <= 0
        pos = 0
        $slider.addClass '__leftlimit'
      else
        pos = pos - shift

      $slider.removeClass '__rightlimit'
      setPosition(pos * -1)

  # Попап оплаты
  paymentPopup            = document.querySelector('.popup--payment');
  closeButtonPaymentPopup = paymentPopup.querySelector('.popup__close');

  payButton               = document.querySelector('.payment__section--list .payment__button');
  returnButton            = document.querySelector('.payment__section--success .payment__button');

  listSection = document.querySelector('.payment__section--list');
  processSection = document.querySelector('.payment__section--process');
  successSection = document.querySelector('.payment__section--success');

  payButton.onclick = ->
    listSection.style.display = 'none'
    processSection.style.display = 'block'
    setTimeout(->
      processSection.style.display = 'none'
      successSection.style.display = 'block'
    , 2000)

  returnButton.onclick = ->
    closePaymentPopup()

  closeButtonPaymentPopup.onclick = ->
    closePaymentPopup()

  closePaymentPopup = ->
    paymentPopup.parentNode.parentNode.parentNode.style.display = 'none'
    document.documentElement.classList.remove 'popup-enabled'
