i18n             = require 'i18next'
ScreenController = require '../../../controllers/screen'

TEXT = -> i18n.t 'signin_button'

AuthButton = React.createClass
  displayName: 'AuthButton'

  render: ->
    <button className="auth-button"
            onClick={ @handleClick }>
      { TEXT() }
    </button>

  handleClick: ->
    #FIXME: Route transitionTo Auth
    ScreenController.show Auth, {}, 'auth-page'

module.exports = AuthButton