ScreenController  = require '../../../controllers/screen'

#TODO: i18n
TEXT = 'Я всё вспомнил, верните меня'

AuthRememberedPasswordLink = React.createClass
  displayName: 'AuthRememberedPasswordLink'

  render: ->
    <a title={ TEXT }
       className="auth__footer-link"
       onClick={ @handleClick }>
      { TEXT }
    </a>

  handleClick: ->
    #FIXME: Route transitionTo Auth
    ScreenController.show Auth, {}, 'auth-page'

module.exports = AuthRememberedPasswordLink