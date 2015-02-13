_                      = require 'lodash'
NotificationsListItem  = require './list/item'
NotificationsListEmpty = require './list/empty'
{ PropTypes } = React

NotificationsList = React.createClass
  displayName: 'NotificationsList'

  propTypes:
    notifications: PropTypes.array.isRequired

  render: ->
    if @isEmpty() then <NotificationsListEmpty /> else @renderListItems()

  renderListItems: ->
    listItems = _.map @props.notifications, (item) ->
      <NotificationsListItem notification={ item } key={ item.id } />

    return <ul className="notifications__list">
             { listItems }
           </ul>

  isEmpty: ->
    @props.notifications.length == 0

module.exports = NotificationsList