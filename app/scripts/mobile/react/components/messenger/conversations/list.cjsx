_                              = require 'lodash'
MessengerConversationListItem  = require './list/item'
MessengerConversationListEmpty = require './list/empty'
{ PropTypes } = React

MessengerConversationList = React.createClass
  displayName: 'MessengerConversationList'

  propTypes:
    items: PropTypes.array.isRequired

  render: ->
    if @isEmpty() then <MessengerConversationListEmpty /> else @renderListItems()

  renderListItems: ->
    listItems = _.map @props.items, (item) ->
      <MessengerConversationListItem item={ item } key={ item.id } />

    return <div className="messages__dialogs">
             { listItems }
           </div>

  isEmpty: ->
    @props.items.length == 0

module.exports = MessengerConversationList