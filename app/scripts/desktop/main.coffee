require './settings'
require './bundle'
global.gon = require './resources/gon'

mockUser = require './data/user'

$ ->
  if localStorage.getItem('userLogged') is 'true'
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