AuthVkontakteButton = React.createClass
  displayName: 'AuthVkontakteButton'

  render: ->
    <button className="vk-auth-button"
            onClick={ @handleClick }>
      { i18n.t('buttons.auth_vkontakte_signin') }
    </button>

  handleClick: ->
    window.location = ApiRoutes.omniauth_url 'vkontakte'

module.exports = AuthVkontakteButton