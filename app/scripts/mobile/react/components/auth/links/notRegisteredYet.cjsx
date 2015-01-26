i18n             = require 'i18next'
ScreenController = require '../../../controllers/screen'

TEXT = -> i18n.t 'not_registered_yet_link'

AuthNotRegisteredYetLink = React.createClass
  displayName: 'AuthNotRegisteredYetLink'

  render: ->
    <a title={ TEXT() }
       className="auth__footer-link"
       onClick={ @handleClick }>
      { TEXT() }
    </a>

  handleClick: ->
    #FIXME: Route transitionTo AuthEmailSignUp
    ScreenController.show AuthEmailSignUp, {}, 'auth-page'

module.exports = AuthNotRegisteredYetLink