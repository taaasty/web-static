ScreenController  = require '../../../controllers/screen'
CurrentUserStore  = require '../../../stores/currentUser'
ConnectStoreMixin = require '../../../../../shared/react/mixins/connectStore'
AuthButton        = require './auth'

#TODO: i18n
TEXT = 'Войти'

AuthButtonManager = React.createClass
  displayName: 'AuthButtonManager'
  mixins: [ConnectStoreMixin(CurrentUserStore)]

  render: ->
    unless @state.logged then <AuthButton /> else null

  getStateFromStore: ->
    logged: CurrentUserStore.isLogged()

  handleClick: ->
    #FIXME: Route transitionTo Auth
    ScreenController.show Auth, {}, 'auth-page'

module.exports = AuthButtonManager