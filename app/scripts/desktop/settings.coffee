TastySettings =
  version:         'static-development'
  env:             'static-development'
  host:            'http://taaasty.com/'
  api_host:        'http://taaasty.com/api/'
  sound_asset_url: 'sounds/'
  localesPath:     '../locales' # For backend path should be absolute like http://taaasty.com/locales

console.log 'TastyVersion', TastySettings.version

TastySettings.host     = localStorage.getItem('host')     if localStorage.getItem('host')?.length > 0
TastySettings.api_host = localStorage.getItem('api_host') if localStorage.getItem('api_host')?.length > 0

window.TastySettings = TastySettings