TastySettings =
  version:           'static-development'
  env:               'static-development'
  host:              'http://taaasty.com'
  api_host:          'http://taaasty.com/api'
  localesPath:       '../locales' # For backend path should be absolute like http://taaasty.com/locales
  locale:            'ru'
  authBackgroundUrl: '../../images/images/Polly-73.jpg' # For backend should be absolute path like http://taaasty.com/images/auth-bg.jpg

console.log 'TastyVersion', TastySettings.version

TastySettings.host     = localStorage.getItem('host')     if localStorage?.getItem('host')?.length > 0
TastySettings.api_host = localStorage.getItem('api_host') if localStorage?.getItem('api_host')?.length > 0

module.exports = TastySettings