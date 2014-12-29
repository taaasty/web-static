#TODO: i18n
SIGN_IN_MESSAGE = 'Вы еще не привязали свой аккаунт Facebook'
BUTTON_TEXT     = 'Найти друзей Facebook'

VkontakteSignIn = React.createClass

  render: ->
    <div className="grid-full">
      <div className="grid-full__middle">
        <div className="popup__text popup__text--soc">
          <span>{ SIGN_IN_MESSAGE } </span>
          <button className="fb-auth-button"
                  onClick={ @handleClick }>
            { BUTTON_TEXT }
          </button>
        </div>
      </div>
    </div>

  handleClick: ->
    window.location = ApiRoutes.omniauth_url 'facebook'

module.exports = VkontakteSignIn