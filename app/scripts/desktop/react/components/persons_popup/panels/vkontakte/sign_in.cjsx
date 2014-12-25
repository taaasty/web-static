#TODO: i18n
SIGN_IN_MESSAGE = 'Вы еще не привязали свой аккаунт Вконтакте'
BUTTON_TEXT     = 'Найти друзей Вконтакте'

VkontakteSignIn = React.createClass

  render: ->
    <div className="grid-full">
      <div className="grid-full__middle">
        <div className="popup__text popup__text--soc">
          <span>{ SIGN_IN_MESSAGE } </span>
          <button className="vk-auth-button"
                  onClick={ @handleClick }>
            { BUTTON_TEXT }
          </button>
        </div>
      </div>
    </div>

  handleClick: ->
    window.location = ApiRoutes.omniauth_url 'vkontakte'

module.exports = VkontakteSignIn