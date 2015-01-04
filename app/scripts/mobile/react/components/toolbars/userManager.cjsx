CurrentUserStore = require '../../stores/current_user'
CurrentUserMixin = require '../../mixins/currentUser'
UserToolbar      = require './user'

UserToolbarManager = React.createClass
  displayName: 'UserToolbarManager'
  mixins: [CurrentUserMixin]

  render: ->
    if @isLogged() then <UserToolbar user={ @state.user } /> else null

module.exports = UserToolbarManager