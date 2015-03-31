CurrentUserStore   = require '../stores/currentUser'
PageMixin          = require './mixins/page'
FeedToolbarManager = require '../components/toolbars/feedManager'
UserToolbarManager = require '../components/toolbars/userManager'
HeroTlog           = require '../components/hero/tlog'
Daylog             = require '../components/Daylog/Daylog'
DaylogPagination   = require '../components/pagination/daylog'
AuthManager        = require '../components/auth/authManager'
AuthButtonManager  = require '../components/buttons/auth/authManager'
# TlogDaylogPageMixin = require './mixins/tlogDaylog'
{ PropTypes } = React

TlogDaylogPage = React.createClass
  displayName: 'TlogDaylogPage'
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
          <Daylog tlog={ @props.tlog } entries={ @props.entries } />
          <DaylogPagination
              slug={ @props.tlog.author.slug }
              prevDay={ @props.pagination.prevDay }
              nextDay={ @props.pagination.nextDay } />
        </div>
      </div>
      <AuthManager />
    </div>

module.exports = TlogDaylogPage