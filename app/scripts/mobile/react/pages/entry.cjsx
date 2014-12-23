CurrentUserStore = require '../stores/current_user'
FeedToolbar      = require '../components/toolbars/feed'
UserToolbar      = require '../components/toolbars/user'
Hero             = require '../components/hero/hero'
Entry            = require '../components/entry/entry'
Pagination       = require '../components/pagination/pagination'
PageMixin        = require './mixins/page'
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
      <FeedToolbar user={ @props.currentUser } />
      <UserToolbar user={ @props.currentUser } />
      <div className="layout">
        <div className="layout__header">
          <Hero tlog={ @props.tlog } />
        </div>
        <div className="layout__body">
          <Entry entry={ @props.entry }
                 user={ @props.currentUser } />
          <Pagination tlogUrl={ @props.tlog.tlog_url } />
        </div>
      </div>
    </div>

module.exports = EntryPage