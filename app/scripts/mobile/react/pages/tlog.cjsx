CurrentUserStore   = require '../stores/currentUser'
FeedToolbarManager = require '../components/toolbars/feedManager'
UserToolbarManager = require '../components/toolbars/userManager'
Hero               = require '../components/hero/hero'
Tlog               = require '../components/tlog/tlog'
TlogPagination     = require '../components/pagination/tlog'
TlogPageMixin      = require './mixins/tlog'
{ PropTypes } = React

TlogPage = React.createClass
  displayName: 'TlogPage'
  mixins: [TlogPageMixin]

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
      <div className="layout">
        <div className="layout__header">
          <Hero tlog={ @props.tlog } />
        </div>
        <div className="layout__body">
          <Tlog entries={ @props.entries } />
          <TlogPagination
              slug={ @props.tlog.author.slug }
              currentPage={ @props.pagination.currentPage }
              totalPagesCount={ @props.pagination.totalPagesCount } />
        </div>
      </div>
    </div>

module.exports = TlogPage