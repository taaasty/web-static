ScreenController  = require '../../../controllers/screen'
AuthEmailRecovery = require '../authEmailRecovery'

#TODO: i18n
TEXT = 'Я забыл пароль'

AuthForgotPasswordLink = React.createClass
  displayName: 'AuthForgotPasswordLink'

  render: ->
    <a title={ TEXT }
       className="auth__footer-link"
       onClick={ @handleClick }>
      { TEXT }
    </a>

  handleClick: ->
    #FIXME: Route transitionTo AuthEmailSignUp
    ScreenController.show AuthEmailRecovery, {}, 'auth-page'

module.exports = AuthForgotPasswordLink