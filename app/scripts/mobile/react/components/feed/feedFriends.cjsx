FeedStore         = require '../../stores/feed'
ComponentMixin    = require '../../mixins/component'
ConnectStoreMixin = require '../../../../shared/react/mixins/connectStore'
FeedMixin         = require './mixins/feed'
FeedViewActions   = require '../../actions/view/feed'
Feed              = require './feed'
{ PropTypes } = React

FeedFriends = React.createClass
  displayName: 'FeedFriends'
  mixins: [ConnectStoreMixin(FeedStore), FeedMixin, ComponentMixin]

  propTypes:
    limit: PropTypes.number

  render: ->
    <Feed entries={ @state.entries }
          loading={ @isLoadingState() }
          everythingLoaded={ @state.everythingLoaded }
          onLoadMore={ @loadMoreEntries } />

  loadMoreEntries: ->
    sinceEntryId = @state.entries[@state.entries.length - 1].id
    limit        = @props.limit

    @activateLoadingState()

    FeedViewActions.loadFriendsEntries sinceEntryId, limit
      .then @activateShowState
      .fail @activateErrorState

module.exports = FeedFriends