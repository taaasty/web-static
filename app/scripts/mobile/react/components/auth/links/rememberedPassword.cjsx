i18n             = require 'i18next'
ScreenController = require '../../../controllers/screen'

TEXT = -> i18n.t 'remembered_password_link'

AuthRememberedPasswordLink = React.createClass
  displayName: 'AuthRememberedPasswordLink'

  render: ->
    <a title={ TEXT() }
       className="auth__footer-link"
       onClick={ @handleClick }>
      { TEXT() }
    </a>

  handleClick: ->
    #FIXME: Route transitionTo Auth
    ScreenController.show Auth, {}, 'auth-page'

module.exports = AuthRememberedPasswordLink