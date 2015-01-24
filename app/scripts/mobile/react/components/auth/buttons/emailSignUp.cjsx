ScreenController = require '../../../controllers/screen'

#TODO: i18n
BUTTON_TEXT = 'или зарегистрироваться'

AuthEmailSignUpButton = React.createClass
  displayName: 'AuthEmailSignUpButton'

  render: ->
    <button className="reg-auth-button"
            onClick={ @handleClick }>
      { BUTTON_TEXT }
    </button>

  handleClick: ->
    #FIXME: Route transitionTo AuthEmailSignUp
    ScreenController.show AuthEmailSignUp, {}, 'auth-page'

module.exports = AuthEmailSignUpButton