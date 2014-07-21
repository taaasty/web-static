require './libs'
window.Routes =
  logout_path: -> TastySettings.host + '/logout'

require './shared/api-routes'

require './aapp/application'

require './aapp/filters/opecityPercentage.js.coffee'
require './aapp/filters/timeAgo.js.coffee'
require './aapp/controllers/post.js.coffee'
require './aapp/controllers/utils.coffee'
require './aapp/controllers/userToolbar.js.coffee'
require './aapp/controllers/designSettings.js.coffee'
require './aapp/controllers/comments/comments_resource.js.coffee'
require './aapp/controllers/designSettings/radio_ctrl.coffee'
require './aapp/controllers/designSettings/design_settings_saver.js.coffee'
require './aapp/controllers/designSettings/opacity_ctrl.coffee'
require './aapp/controllers/designSettings/background.coffee'
require './aapp/controllers/comments.js.coffee'
require './aapp/controllers/post/post_comments_toggle.js.coffee'
require './aapp/controllers/infiniteFeedController.coffee'
require './aapp/application.coffee'
require './aapp/services/designSettingsService.js.coffee'
require './aapp/services/declension.js.coffee'
require './aapp/services/designSettingsDragable.js.coffee'
require './aapp/directives/eatClick.js'
require './aapp/directives/enter.js'


require './react/mixins/unmount'
require './react/mixins/shake'
require './react/mixins/grammar'
require './react/mixins/error_timer'
require './react/mixins/activities'
require './react/mixins/requester'

require './react/components/avatar'

require './react/components/shellbox/email_signin_shellbox'
require './react/components/shellbox/email_signup_shellbox'
require './react/components/shellbox/recovery_shellbox'
require './react/components/shellbox/select_signin_shellbox'
require './react/components/shellbox/inviter_shellbox'

require './react/components/settings_popup/settings_avatar'
require './react/components/settings_popup/settings_title'
require './react/components/settings_popup/settings_accounts_item'
require './react/components/settings_popup/settings_email_input'
require './react/components/settings_popup/settings_email_confirmation'
require './react/components/settings_popup/settings_header'
require './react/components/settings_popup/settings_password_input'
require './react/components/settings_popup/settings_radio_item'
require './react/components/settings_popup/settings_vkontakte'
require './react/components/settings_popup/toolbar_settings'

require './react/components/voting'
require './react/components/shellbox_layer'
require './react/components/follow_button'
require './react/components/relationship_following_button'
require './react/components/relationship_guess_button'

require './react/components/popup_box'
require './react/components/popup/popup'
require './react/components/popup/layout'
require './react/components/popup/spinner'
require './react/components/popup/header'

require './react/components/calendar/calendar'
require './react/components/calendar/calendar_timeline'
require './react/components/calendar/calendar_header'
require './react/components/calendar/calendar_period'
require './react/components/calendar/calendar_marker'

require './react/components/persons_popup/mixins/panel_mixin'
require './react/components/persons_popup/persons_popup'
require './react/components/persons_popup/menu'
require './react/components/persons_popup/menu_item'

require './react/components/persons_popup/items/item'
require './react/components/persons_popup/items/following_relationship'
require './react/components/persons_popup/items/follower_relationship'
require './react/components/persons_popup/items/guess_relationship'
require './react/components/persons_popup/items/ignored_relationship'

require './react/components/persons_popup/panels/followings_panel'
require './react/components/persons_popup/panels/followers_panel'
require './react/components/persons_popup/panels/guesses_panel'
require './react/components/persons_popup/panels/ignores_panel'

require './react/components/post/post_actions'
require './react/components/post/post_editor'
require './react/components/post/post_editor_layout'
require './react/components/post/post_editor_images_container'

require './react/components/images_collage'

require './react/components/tasty_notify'
require './react/controllers/tasty_notify'
require './react/controllers/shellbox'
require './react/controllers/popup'
require './react/application'


require './editors'

SomeUser     = require './data/user.json'
SomeCalendar = require './data/calendar.json'
SomeEntry    = require './data/entry.json'
UserGenue =
  id: 1
  email: 'genue@ya.ru'
  api_key:
    access_token: 'd72fd485ca42af43d133d7367a4b4a3b'

window.TastySettings =
  host:     'http://3000.vkontraste.ru/' # Это не api-шный хост, это адрес для прямых ссылок
  api_host: 'http://3000.vkontraste.ru/api/'

window.TastySettings.host = localStorage.getItem('host') if localStorage.getItem('host')?.length > 0
window.TastySettings.api_host = localStorage.getItem('api_host') if localStorage.getItem('api_host')?.length > 0

# Контейнер для будущих данных проекта. Сюда постепенно мигрируют
# модели из window.Tasty по мере перехода на модели
window.TastyData = {}

console.info? "Установить/Сбросить залогиненного пользтвателя: localStorage.setItem('userLogged', false/true)"

if localStorage.getItem('userLogged') == "true"
  window.TastyData.user = new Backbone.Model SomeUser

  $.ajaxSetup
    xhrFields:
      withCredentials: true
      crossDomain: true
    headers:
      "X-User-Token": SomeUser.api_key.access_token

else
  console.log 'Без пользователя'
  $.ajaxSetup
    xhrFields:
      withCredentials: true
      crossDomain: true

# React_ujs нужно подключать после того как все компоненты загружены
window.ReactUjs = require 'react_ujs'

$ ->
  $(".js-dropdown").dropdown()

  ReactApp.start user: TastyData.user
