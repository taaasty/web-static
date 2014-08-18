
SomeUser     = require './data/user.json'
SomeCalendar = require './data/calendar.json'
SomeEntry    = require './data/entry.json'
UserGenue =
  id: 1
  email: 'genue@ya.ru'
  api_key:
    access_token: 'd72fd485ca42af43d133d7367a4b4a3b'

window.TASTY_ENV = 'development'
window.TastySettings =
  host:     'http://3000.vkontraste.ru/' # Это не api-шный хост, это адрес для прямых ссылок
  api_host: 'http://3000.vkontraste.ru/api/'

window.TastySettings.host = localStorage.getItem('host') if localStorage.getItem('host')?.length > 0
window.TastySettings.api_host = localStorage.getItem('api_host') if localStorage.getItem('api_host')?.length > 0

# Контейнер для будущих данных проекта. Сюда постепенно мигрируют
# модели из window.Tasty по мере перехода на модели

console.info? "Установить/Сбросить залогиненного пользтвателя: localStorage.setItem('userLogged', false/true)"

if localStorage.getItem('userLogged') == "true"
  window.tastyUser = SomeUser
  console.log 'Залогинен пользователь:', window.tastyUser.slug

  $.ajaxSetup
    xhrFields:
      withCredentials: true
      crossDomain: true
    headers:
      "X-User-Token": SomeUser.api_key.access_token

else
  console.log 'Без пользователя'
  #$.ajaxSetup
    #xhrFields:
      #withCredentials: true
      #crossDomain: true


