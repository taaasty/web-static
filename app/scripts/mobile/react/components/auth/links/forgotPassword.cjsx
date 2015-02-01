ScreenController  = require '../../../controllers/screen'
AuthEmailRecovery = require '../authEmailRecovery'

AuthForgotPasswordLink = React.createClass
  displayName: 'AuthForgotPasswordLink'

  render: ->
    <a className="auth__footer-link"
       onClick={ @handleClick }>
      { i18n.t('auth.forgot_password_link') }
    </a>

  handleClick: ->
    #FIXME: Route transitionTo AuthEmailSignUp
    ScreenController.show AuthEmailRecovery, {}, 'auth-page'

module.exports = AuthForgotPasswordLink