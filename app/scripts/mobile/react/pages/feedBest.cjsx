CurrentUserStore   = require '../stores/currentUser'
PageMixin          = require './mixins/page'
FeedToolbarManager = require '../components/toolbars/feedManager'
UserToolbarManager = require '../components/toolbars/userManager'
HeroFeedBest       = require '../components/hero/feedBest'
FeedBest           = require '../components/feed/feedBest'
AuthManager        = require '../components/auth/authManager'
AuthButtonManager  = require '../components/buttons/auth/authManager'
FeedBestPageMixin  = require './mixins/feedBest'
{ PropTypes } = React

FeedBestPage = React.createClass
  displayName: 'FeedBestPage'
  mixins: [FeedBestPageMixin, PageMixin]

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
      <AuthButtonManager />
      <div className="layout">
        <div className="layout__header">
          <HeroFeedBest
              backgroundUrl={ @props.feed.backgroundUrl }
              entriesCount={ @props.feed.entriesCount } />
        </div>
        <div className="layout__body">
          <FeedBest entries={ @props.entries } />
        </div>
      </div>
      <AuthManager />
    </div>

module.exports = FeedBestPage