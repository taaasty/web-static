i18n             = require 'i18next'
ScreenController = require '../../../controllers/screen'
AuthEmailSignIn  = require '../authEmailSignIn'

BUTTON_TEXT = -> i18n.t 'email_signin_button'

AuthEmailSignInButton = React.createClass
  displayName: 'AuthEmailSignInButton'

  render: ->
    <button className="site-auth-button"
            onClick={ @handleClick }>
      { BUTTON_TEXT() }
    </button>

  handleClick: ->
    #FIXME: Route transitionTo AuthEmailSignIn
    ScreenController.show AuthEmailSignIn, {}, 'auth-page'

module.exports = AuthEmailSignInButton