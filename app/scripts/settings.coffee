window.SomeUser     = require './data/user.json'
window.SomeCalendar = require './data/calendar.json'
window.SomeEntry    = require './data/entry.json'

window.TastySettings =
  host:      'http://3000.vkontraste.ru/' # Это не api-шный хост, это адрес для прямых ссылок
  api_host:  'http://3000.vkontraste.ru/api/'
  asset_url: 'http://3000.vkontraste.ru/'

window.TastySettings.host      = localStorage.getItem('host')      if localStorage.getItem('host')?.length > 0
window.TastySettings.api_host  = localStorage.getItem('api_host')  if localStorage.getItem('api_host')?.length > 0
window.TastySettings.asset_url = localStorage.getItem('asset_url') if localStorage.getItem('asset_url')?.length > 0

# Контейнер для будущих данных проекта. Сюда постепенно мигрируют
# модели из window.Tasty по мере перехода на модели

console.info? "Установить/Сбросить залогиненного пользтвателя: localStorage.setItem('userLogged', false/true)"

window.TASTY_ENV = 'static-development'