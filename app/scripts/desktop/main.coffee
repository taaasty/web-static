require './settings'
require './bundle'
require './gon'

mockUser = require './data/user'

$ ->
  if localStorage.getItem('userLogged') is "true"
    if localStorage.getItem 'userToken'
      mockUser.api_key.access_token = localStorage.getItem 'userToken'

    if localStorage.getItem 'userId'
      mockUser.id = parseInt( localStorage.getItem('userId') )

    window.Tasty.start user: mockUser
  else
    console.debug? 'Без пользователя'
    window.Tasty.start {}

  # Тултип для шаринга
  $("[tooltip]").tooltip()

  # Запускаем гайд
  introJs.introJs().start()