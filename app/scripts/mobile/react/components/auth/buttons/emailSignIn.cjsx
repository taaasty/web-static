ScreenController = require '../../../controllers/screen'
AuthEmailSignIn  = require '../authEmailSignIn'

AuthEmailSignInButton = React.createClass
  displayName: 'AuthEmailSignInButton'

  render: ->
    <button className="site-auth-button"
            onClick={ @handleClick }>
      { i18n.t('buttons.auth_email_signin') }
    </button>

  handleClick: ->
    #FIXME: Route transitionTo AuthEmailSignIn
    ScreenController.show AuthEmailSignIn, {}, 'auth-page'

module.exports = AuthEmailSignInButton