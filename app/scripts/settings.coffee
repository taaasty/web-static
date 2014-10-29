TastySettings =
  version:           'v0.3.1'
  host:              'http://taaasty.ru/'
  api_host:          'http://taaasty.ru/api/'
  env:               'static-development'
  sound_asset_url:   'sounds/'
  locales_asset_url: 'locales/'

console.log 'TastyVersion', TastySettings.version

TastySettings.host     = localStorage.getItem('host')     if localStorage.getItem('host')?.length > 0
TastySettings.api_host = localStorage.getItem('api_host') if localStorage.getItem('api_host')?.length > 0

module.exports = TastySettings