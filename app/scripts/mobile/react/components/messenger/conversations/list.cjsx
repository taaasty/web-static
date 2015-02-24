_                     = require 'lodash'
ConversationListItem  = require './list/item'
ConversationListEmpty = require './list/empty'
{ PropTypes } = React

ConversationList = React.createClass
  displayName: 'ConversationList'

  propTypes:
    items:       PropTypes.array.isRequired
    onItemClick: PropTypes.func.isRequired

  render: ->
    if @isEmpty() then <ConversationListEmpty /> else @renderListItems()

  renderListItems: ->
    listItems = _.map @props.items, (item) =>
      <ConversationListItem
          item={ item }
          onClick={ @props.onItemClick }
          key={ item.id } />

    return <div className="messages__scroll">
             <div className="messages__dialogs">
               { listItems }
             </div>
           </div>

  isEmpty: ->
    @props.items.length == 0

module.exports = ConversationList