CurrentUserStore  = require '../../stores/currentUser'
ConnectStoreMixin = require '../../../../shared/react/mixins/connectStore'
Auth              = require './auth'

AuthManager = React.createClass
  displayName: 'AuthManager'
  mixins: [ConnectStoreMixin(CurrentUserStore)]

  render: ->
    unless @state.logged then <Auth /> else null

  getStateFromStore: ->
    user:   CurrentUserStore.getUser()
    logged: CurrentUserStore.isLogged()

module.exports = AuthManager