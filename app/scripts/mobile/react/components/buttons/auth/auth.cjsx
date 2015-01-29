ScreenController = require '../../../controllers/screen'

AuthButton = React.createClass
  displayName: 'AuthButton'

  render: ->
    <button className="auth-button"
            onClick={ @handleClick }>
      { i18n.t('signin_button') }
    </button>

  handleClick: ->
    #FIXME: Route transitionTo Auth
    ScreenController.show Auth, {}, 'auth-page'

module.exports = AuthButton