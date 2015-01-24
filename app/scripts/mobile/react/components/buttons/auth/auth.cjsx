ScreenController = require '../../../controllers/screen'

#TODO: i18n
TEXT = 'Войти'

AuthButton = React.createClass
  displayName: 'AuthButton'

  render: ->
    <button className="auth-button"
            onClick={ @handleClick }>
      { TEXT }
    </button>

  handleClick: ->
    #FIXME: Route transitionTo Auth
    ScreenController.show Auth, {}, 'auth-page'

module.exports = AuthButton