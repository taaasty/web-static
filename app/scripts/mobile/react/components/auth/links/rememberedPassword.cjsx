ScreenController = require '../../../controllers/screen'

AuthRememberedPasswordLink = React.createClass
  displayName: 'AuthRememberedPasswordLink'

  render: ->
    <a className="auth__footer-link"
       onClick={ @handleClick }>
      { i18n.t('remembered_password_link') }
    </a>

  handleClick: ->
    #FIXME: Route transitionTo Auth
    ScreenController.show Auth, {}, 'auth-page'

module.exports = AuthRememberedPasswordLink