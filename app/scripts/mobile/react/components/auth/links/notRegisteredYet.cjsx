ScreenController = require '../../../controllers/screen'

AuthNotRegisteredYetLink = React.createClass
  displayName: 'AuthNotRegisteredYetLink'

  render: ->
    <a className="auth__footer-link"
       onClick={ @handleClick }>
      { i18n.t('auth.not_registered_yet_link') }
    </a>

  handleClick: ->
    #FIXME: Route transitionTo AuthEmailSignUp
    ScreenController.show AuthEmailSignUp, {}, 'auth-page'

module.exports = AuthNotRegisteredYetLink