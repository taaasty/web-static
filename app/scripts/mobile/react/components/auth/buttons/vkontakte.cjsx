#TODO: i18n
BUTTON_TEXT = 'Войти с помощью Вконтакте'

AuthVkontakteButton = React.createClass
  displayName: 'AuthVkontakteButton'

  render: ->
    <button className="vk-auth-button"
            onClick={ @handleClick }>
      { BUTTON_TEXT }
    </button>

  handleClick: ->
    window.location = ApiRoutes.omniauth_url 'vkontakte'

module.exports = AuthVkontakteButton