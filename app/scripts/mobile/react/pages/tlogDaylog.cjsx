CurrentUserStore    = require '../stores/currentUser'
FeedToolbarManager  = require '../components/toolbars/feedManager'
UserToolbarManager  = require '../components/toolbars/userManager'
HeroTlog            = require '../components/hero/tlog'
Daylog              = require '../components/daylog/daylog'
DaylogPagination    = require '../components/pagination/daylog'
# TlogDaylogPageMixin = require './mixins/tlogDaylog'
{ PropTypes } = React

TlogDaylogPage = React.createClass
  displayName: 'TlogDaylogPage'
  # mixins: [TlogDaylogPageMixin]

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
          <HeroTlog tlog={ @props.tlog } />
        </div>
        <div className="layout__body">
          <Daylog entries={ @props.entries } />
          <DaylogPagination
              slug={ @props.tlog.author.slug }
              prevDay={ @props.pagination.prevDay }
              nextDay={ @props.pagination.nextDay } />
        </div>
      </div>
    </div>

module.exports = TlogDaylogPage