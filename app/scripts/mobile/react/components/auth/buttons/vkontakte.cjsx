i18n = require 'i18next'

BUTTON_TEXT = -> i18n.t 'vkontakte_signin_button'

AuthVkontakteButton = React.createClass
  displayName: 'AuthVkontakteButton'

  render: ->
    <button className="vk-auth-button"
            onClick={ @handleClick }>
      { BUTTON_TEXT() }
    </button>

  handleClick: ->
    window.location = ApiRoutes.omniauth_url 'vkontakte'

module.exports = AuthVkontakteButton