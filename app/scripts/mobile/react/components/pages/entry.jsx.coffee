###* @jsx React.DOM ###

UserToolbar = require '../toolbars/user'
FeedToolbar = require '../toolbars/feed'

window.EntryPage = React.createClass

  propTypes:
    type: React.PropTypes.string.isRequired

  render: ->
   `<div>
      <UserToolbar />
      <FeedToolbar />
    </div>`