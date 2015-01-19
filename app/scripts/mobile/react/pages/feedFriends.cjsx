CurrentUserStore     = require '../stores/currentUser'
FeedToolbarManager   = require '../components/toolbars/feedManager'
UserToolbarManager   = require '../components/toolbars/userManager'
HeroFeedFriends      = require '../components/hero/feedFriends'
FeedFriends          = require '../components/feed/feedFriends'
FeedFriendsPageMixin = require './mixins/feedFriends'
{ PropTypes } = React

FeedFriendsPage = React.createClass
  displayName: 'FeedFriendsPage'
  mixins: [FeedFriendsPageMixin]

  propTypes:
    currentUser: PropTypes.object
    entries:     PropTypes.array.isRequired
    feed:        PropTypes.object.isRequired

  componentWillMount: ->
    # Temporarily initialize CurrentUserStore here. Later on it will be set at
    # root App component
    # Some signin gists https://gist.github.com/ButuzGOL/707d1605f63eef55e4af
    CurrentUserStore.initialize @props.currentUser

  render: ->
    <div>
      <FeedToolbarManager />
      <UserToolbarManager />
      <div className="layout">
        <div className="layout__header">
          <HeroFeedFriends
              backgroundUrl={ @props.feed.backgroundUrl }
              entriesCount={ @props.feed.entriesCount } />
        </div>
        <div className="layout__body">
          <FeedFriends entries={ @props.entries } />
        </div>
      </div>
    </div>

module.exports = FeedFriendsPage