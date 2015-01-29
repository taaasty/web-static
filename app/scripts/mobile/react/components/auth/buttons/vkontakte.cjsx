AuthVkontakteButton = React.createClass
  displayName: 'AuthVkontakteButton'

  render: ->
    <button className="vk-auth-button"
            onClick={ @handleClick }>
      { i18n.t('vkontakte_signin_button') }
    </button>

  handleClick: ->
    window.location = ApiRoutes.omniauth_url 'vkontakte'

module.exports = AuthVkontakteButton