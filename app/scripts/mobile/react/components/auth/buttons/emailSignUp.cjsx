i18n             = require 'i18next'
ScreenController = require '../../../controllers/screen'

BUTTON_TEXT = -> i18n.t 'email_signup_button'

AuthEmailSignUpButton = React.createClass
  displayName: 'AuthEmailSignUpButton'

  render: ->
    <button className="reg-auth-button"
            onClick={ @handleClick }>
      { BUTTON_TEXT() }
    </button>

  handleClick: ->
    #FIXME: Route transitionTo AuthEmailSignUp
    ScreenController.show AuthEmailSignUp, {}, 'auth-page'

module.exports = AuthEmailSignUpButton