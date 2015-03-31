CurrentUserStore   = require '../stores/currentUser'
PageMixin          = require './mixins/page'
FeedToolbarManager = require '../components/toolbars/feedManager'
UserToolbarManager = require '../components/toolbars/userManager'
HeroTlog           = require '../components/hero/tlog'
Tlog               = require '../components/Tlog/Tlog'
TlogPagination     = require '../components/pagination/tlog'
AuthManager        = require '../components/auth/authManager'
AuthButtonManager  = require '../components/buttons/auth/authManager'
# TlogRegularPageMixin = require './mixins/tlogRegular'
{ PropTypes } = React

TlogRegularPage = React.createClass
  displayName: 'TlogRegularPage'
  mixins: [PageMixin]

  propTypes:
    currentUser: PropTypes.object
    tlog:        PropTypes.object.isRequired
    entries:     PropTypes.array.isRequired
    pagination:  PropTypes.object.isRequired

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
          <Tlog tlog={ @props.tlog } entries={ @props.entries } />
          <TlogPagination
              slug={ @props.tlog.author.slug }
              currentPage={ @props.pagination.currentPage }
              totalPagesCount={ @props.pagination.totalPagesCount } />
        </div>
      </div>
      <AuthManager />
    </div>

module.exports = TlogRegularPage