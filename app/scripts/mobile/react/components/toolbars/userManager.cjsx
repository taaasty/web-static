CurrentUserStore  = require '../../stores/currentUser'
ConnectStoreMixin = require '../../mixins/connectStore'
UserToolbar       = require './user'

UserToolbarManager = React.createClass
  displayName: 'UserToolbarManager'
  mixins: [ConnectStoreMixin(CurrentUserStore)]

  render: ->
    if @state.logged then <UserToolbar user={ @state.user } /> else null

  getStateFromStore: ->
    user:   CurrentUserStore.getUser()
    logged: CurrentUserStore.isLogged()

module.exports = UserToolbarManager