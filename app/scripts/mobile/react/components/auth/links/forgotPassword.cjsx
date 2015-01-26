i18n              = require 'i18next'
ScreenController  = require '../../../controllers/screen'
AuthEmailRecovery = require '../authEmailRecovery'

TEXT = -> i18n.t 'forgot_password_link'

AuthForgotPasswordLink = React.createClass
  displayName: 'AuthForgotPasswordLink'

  render: ->
    <a title={ TEXT() }
       className="auth__footer-link"
       onClick={ @handleClick }>
      { TEXT() }
    </a>

  handleClick: ->
    #FIXME: Route transitionTo AuthEmailSignUp
    ScreenController.show AuthEmailRecovery, {}, 'auth-page'

module.exports = AuthForgotPasswordLink