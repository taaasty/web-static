###* @jsx React.DOM ###

UserToolbar = require '../toolbars/user'
FeedToolbar = require '../toolbars/feed'
Hero        = require '../hero/hero'
Post        = require '../post/post'
Pagination  = require '../pagination/pagination'

window.PostPage = React.createClass

  propTypes:
    type: React.PropTypes.string.isRequired

  render: ->
   `<div>
      <UserToolbar />
      <FeedToolbar />
      <div className="layout">
        <div className="layout__header"><Hero /></div>
        <div className="layout__body">
          <Post />
          <Pagination />
        </div>
      </div>
    </div>`