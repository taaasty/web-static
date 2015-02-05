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

  # document.onclick = (e) ->
  #   if !$(e.target).hasClass('toolbar__toggle') &&
  #      $(e.target).closest('.toolbar__toggle').length == 0
  #     mainToolbar.classList.remove('state--active')

  mainToolbarToggle.onclick = ->
    # mainToolbar.classList.toggle('state--active')
      document.body.classList.toggle('main-toolbar-open');

  # Тултип для шаринга
  $("[tooltip]").tooltip()
