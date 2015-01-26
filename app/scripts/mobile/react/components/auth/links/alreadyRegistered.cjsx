i18n             = require 'i18next'
ScreenController = require '../../../controllers/screen'

TEXT = -> i18n.t 'already_registered_link'

AuthNotRegisteredYetLink = React.createClass
  displayName: 'AuthNotRegisteredYetLink'

  render: ->
    <a title={ TEXT() }
       className="auth__footer-link"
       onClick={ @handleClick }>
      { TEXT() }
    </a>

  handleClick: ->
    #FIXME: Route transitionTo Auth
    ScreenController.show Auth, {}, 'auth-page'

module.exports = AuthNotRegisteredYetLink