VkontakteSignIn = React.createClass

  render: ->
    <div className="grid-full">
      <div className="grid-full__middle">
        <div className="popup__text popup__text--soc">
          <span>{ i18n.t('vkontakte_suggestions_not_signedin') } </span>
          <button className="vk-auth-button"
                  onClick={ @handleClick }>
            { i18n.t('vkontakte_suggestions_signin_button') }
          </button>
        </div>
      </div>
    </div>

  handleClick: ->
    window.location = ApiRoutes.omniauth_url 'vkontakte'

module.exports = VkontakteSignIn