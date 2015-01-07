CurrentUserStore  = require '../../stores/currentUser'
ConnectStoreMixin = require '../../mixins/connectStore'
FeedToolbar       = require './feed'

FeedToolbarManager = React.createClass
  displayName: 'FeedToolbarManager'
  mixins: [ConnectStoreMixin(CurrentUserStore)]

  render: ->
    <FeedToolbar user={ @state.user } />

  getStateFromStore: ->
    user: CurrentUserStore.getUser()

module.exports = FeedToolbarManager