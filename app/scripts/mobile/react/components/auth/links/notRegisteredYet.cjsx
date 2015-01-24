ScreenController = require '../../../controllers/screen'

#TODO: i18n
TEXT = 'Я еще не зарегистрирован'

AuthNotRegisteredYetLink = React.createClass
  displayName: 'AuthNotRegisteredYetLink'

  render: ->
    <a title={ TEXT }
       className="auth__footer-link"
       onClick={ @handleClick }>
      { TEXT }
    </a>

  handleClick: ->
    #FIXME: Route transitionTo AuthEmailSignUp
    ScreenController.show AuthEmailSignUp, {}, 'auth-page'

module.exports = AuthNotRegisteredYetLink