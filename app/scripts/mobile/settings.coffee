TastySettings =
  version:     'static-development'
  env:         'static-development'
  host:        'http://taaasty.com'
  api_host:    'http://taaasty.com/api'
  localesPath: '../locales/i18n' # For backend path should be absolute like http://taaasty.com/locales
  locale:      'ru'

console.log 'TastyVersion', TastySettings.version

TastySettings.host     = localStorage.getItem('host')     if localStorage?.getItem('host')?.length > 0
TastySettings.api_host = localStorage.getItem('api_host') if localStorage?.getItem('api_host')?.length > 0

module.exports = TastySettings