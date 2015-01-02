CurrentUserStore = require '../../stores/current_user'
CurrentUserMixin = require '../../mixins/currentUser'
FeedToolbar      = require './feed'

FeedToolbarManager = React.createClass
  displayName: 'FeedToolbarManager'
  mixins: [CurrentUserMixin]

  render: ->
    <FeedToolbar user={ @state.user } />

module.exports = FeedToolbarManager