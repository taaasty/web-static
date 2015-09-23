CurrentUserStore = require '../stores/currentUser'
FeedStore = require '../stores/feed'
PageMixin = require './mixins/page'
# FeedLivePageMixin = require './mixins/feedLive'
FeedToolbarManager = require '../components/toolbars/feedManager'
UserToolbarManager = require '../components/toolbars/userManager'
HeroFeedLive = require '../components/hero/feedLive'
FeedLive = require '../components/feed/feedLive'
AuthManager = require '../components/auth/authManager'
AuthButtonManager = require '../components/buttons/auth/authManager'
{ PropTypes } = React

FeedLivePage = React.createClass
  displayName: 'FeedLivePage'
  mixins: [PageMixin]

  propTypes:
    currentUser: PropTypes.object
    entries:     PropTypes.array.isRequired
    feed:        PropTypes.object.isRequired

  componentWillMount: ->
    # Temporarily initialize CurrentUserStore here. Later on it will be set at
    # root App component
    # Some signin gists https://gist.github.com/ButuzGOL/707d1605f63eef55e4af
    CurrentUserStore.initialize @props.currentUser
    FeedStore.initialize @props.entries

  render: ->
    <div>
      <FeedToolbarManager />
      <UserToolbarManager />
      <AuthButtonManager />
      <div className="layout">
        <div className="layout__header">
          <HeroFeedLive
            backgroundUrl={ @props.feed.backgroundUrl }
            currentUser={ this.props.currentUser }
            entriesCount={ @props.feed.entriesCount }
          />
        </div>
        <div className="layout__body">
          <FeedLive />
        </div>
      </div>
      <AuthManager />
    </div>

module.exports = FeedLivePage