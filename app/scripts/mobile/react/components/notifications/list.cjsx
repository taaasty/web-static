_                     = require 'lodash'
NotificationListItem  = require './list/item'
NotificationListEmpty = require './list/empty'
{ PropTypes } = React

NotificationList = React.createClass
  displayName: 'NotificationList'

  propTypes:
    items:      PropTypes.array.isRequired
    onItemRead: PropTypes.func.isRequired

  render: ->
    if @isEmpty() then <NotificationListEmpty /> else @renderListItems()

  renderListItems: ->
    listItems = _.map @props.items, (item) =>
      <NotificationListItem
          item={ item }
          onRead={ @props.onItemRead }
          key={ item.id } />

    return <ul className="notifications__list">
             { listItems }
           </ul>

  isEmpty: ->
    @props.items.length == 0

module.exports = NotificationList