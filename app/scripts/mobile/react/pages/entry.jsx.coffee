###* @jsx React.DOM ###

Hero        = require '../components/hero/hero'
Entry       = require '../components/entry/entry'
Pagination  = require '../components/pagination/pagination'
{ PropTypes } = React

window.EntryPage = React.createClass

  propTypes:
    type: PropTypes.string.isRequired

  render: ->
   `<div>
      <UserToolbar />
      <FeedToolbar />
      <div className="layout">
        <div className="layout__header"><Hero /></div>
        <div className="layout__body">
          <Entry />
          <Pagination />
        </div>
      </div>
    </div>`