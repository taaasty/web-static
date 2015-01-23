ScreenController = require '../../../controllers/screen'
AuthEmailSignIn  = require '../authEmailSignIn'

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
    #FIXME: Route transitionTo AuthEmailSignIn
    ScreenController.show AuthEmailSignIn, {}, 'auth-page'

module.exports = AuthEmailSignInButton