FeedToolbar    = require '../components/toolbars/feed'
UserToolbar    = require '../components/toolbars/user'
Hero           = require '../components/hero/hero'
Entry          = require '../components/entry/entry'
Pagination     = require '../components/pagination/pagination'
PageMixin      = require './mixins/page'
{ PropTypes } = React

window.EntryPage = React.createClass
  displayName: 'EntryPage'
  mixins: [PageMixin]

  propTypes:
    currentUser: PropTypes.object
    tlog:        PropTypes.object.isRequired
    entry:       PropTypes.object.isRequired

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
          <Pagination />
        </div>
      </div>
    </div>