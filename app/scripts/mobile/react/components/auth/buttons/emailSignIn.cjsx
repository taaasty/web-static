#TODO: i18n
BUTTON_TEXT = 'Войти с помощью эл. почты'

AuthEmailSignInButton = React.createClass
  displayName: 'AuthEmailSignInButton'

  render: ->
    <button className="site-auth-button"
            onClick={ @handleClick }>
      { BUTTON_TEXT }
    </button>

  handleClick: ->
    #FIXME: Route transitionTo
    # window.location = ApiRoutes.omniauth_url 'facebook'

module.exports = AuthEmailSignInButton