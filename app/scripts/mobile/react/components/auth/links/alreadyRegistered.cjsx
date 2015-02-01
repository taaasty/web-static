ScreenController = require '../../../controllers/screen'

AuthNotRegisteredYetLink = React.createClass
  displayName: 'AuthNotRegisteredYetLink'

  render: ->
    <a className="auth__footer-link"
       onClick={ @handleClick }>
      { i18n.t('auth.already_registered_link') }
    </a>

  handleClick: ->
    #FIXME: Route transitionTo Auth
    ScreenController.show Auth, {}, 'auth-page'

module.exports = AuthNotRegisteredYetLink