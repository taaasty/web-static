ScreenController = require '../../../controllers/screen'

AuthEmailSignUpButton = React.createClass
  displayName: 'AuthEmailSignUpButton'

  render: ->
    <button className="reg-auth-button"
            onClick={ @handleClick }>
      { i18n.t('buttons.auth_email_signup') }
    </button>

  handleClick: ->
    #FIXME: Route transitionTo AuthEmailSignUp
    ScreenController.show AuthEmailSignUp, {}, 'auth-page'

module.exports = AuthEmailSignUpButton