global.TastySettings = require './settings'
global.gon           = require './resources/gon'
require './bundle'

ReactApp.start
  locale: 'ru'
  userID: parseInt localStorage.getItem('userId')
  userToken: localStorage.getItem 'userToken'