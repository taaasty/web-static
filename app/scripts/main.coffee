require './libs'

window.Routes =
  logout_path: -> Tasty.host + '/logout'

require './shared/api-routes'
require './react/mixins/shake'
require './react/components/avatar'
require './react/components/email_signin_shellbox'
require './react/components/email_signup_shellbox'
require './react/components/recovery_shellbox'
require './react/components/select_signin_shellbox'
require './react/components/settings_avatar'
require './react/components/settings_title'
require './react/components/settings_accounts_item'
require './react/components/settings_email_input'
require './react/components/settings_email_confirmation'
require './react/components/settings_header'
require './react/components/settings_password_input'
require './react/components/settings_radio_item'
require './react/components/settings_vkontakte'
require './react/components/toolbar_settings'
require './react/components/voting'
require './react/components/inviter_shellbox'
require './react/components/popup_spinner'
require './react/components/popup_box'
require './react/components/shellbox_layer'
require './react/components/follow_button'
require './react/application'

SomeUser = require './data/user.json'
UserGenue = 
  id: 1
  email: 'genue@ya.ru'
  api_key:
    access_token: 'd72fd485ca42af43d133d7367a4b4a3b'

window.Tasty =
  user: SomeUser
  host: 'http://3000.vkontraste.ru/'
  api_host: 'http://3000.vkontraste.ru/'

$.ajaxSetup
  xhrFields:
    withCredentials: true
    crossDomain: true
  headers: 
    "X-User-Token": Tasty.user.api_key.access_token

ReactApp.start()
