CurrentUserStore   = require '../stores/currentUser'
PageMixin          = require './mixins/page'
FeedToolbarManager = require '../components/toolbars/feedManager'
UserToolbarManager = require '../components/toolbars/userManager'
HeroTlog           = require '../components/hero/tlog'
EntryTlog          = require '../components/entry/Tlog'
EntryPagination    = require '../components/pagination/entry'
AuthManager        = require '../components/auth/authManager'
AuthButtonManager  = require '../components/buttons/auth/authManager'
{ PropTypes } = React

EntryPage = React.createClass
  displayName: 'EntryPage'
  mixins: [PageMixin]

  propTypes:
    currentUser: PropTypes.object
    tlog:        PropTypes.object.isRequired
    entry:       PropTypes.object.isRequired

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
          <HeroTlog tlog={ @props.tlog } />
        </div>
        <div className="layout__body">
          <EntryTlog
              entry={ @props.entry }
              commentFormVisible={ true } />
          <EntryPagination tlogUrl={ @props.tlog.tlog_url } />
        </div>
      </div>
      <AuthManager />
    </div>

module.exports = EntryPage