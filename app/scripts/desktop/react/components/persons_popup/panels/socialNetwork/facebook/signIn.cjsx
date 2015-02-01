VkontakteSignIn = React.createClass

  render: ->
    <div className="grid-full">
      <div className="grid-full__middle">
        <div className="popup__text popup__text--soc">
          <span>{ i18n.t('facebook_suggestions_not_signedin') } </span>
          <button className="fb-auth-button"
                  onClick={ @handleClick }>
            { i18n.t('facebook_suggestions_signin_button') }
          </button>
        </div>
      </div>
    </div>

  handleClick: ->
    window.location = ApiRoutes.omniauth_url 'facebook'

module.exports = VkontakteSignIn