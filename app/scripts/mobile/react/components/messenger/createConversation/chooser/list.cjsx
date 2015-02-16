_                         = require 'lodash'
MessengerChooserListEmpty = require './list/empty'
MessengerChooserListItem  = require './list/item'
{ PropTypes } = React

MessengerChooserList = React.createClass
  displayName: 'MessengerChooserList'

  propTypes:
    items:        PropTypes.array.isRequired
    onItemSelect: PropTypes.func.isRequired

  render: ->
    if @isEmpty() then <MessengerChooserListEmpty /> else @renderListItems()

  renderListItems: ->
    listItems = _.map @props.items, (item) =>
      <MessengerChooserListItem
          item={ item }
          onSelect={ @props.onItemSelect }
          key={ item.id } />

    return <ul className="messages__chooser-results">
             { listItems }
           </ul>

  isEmpty: ->
    @props.items.length == 0

module.exports = MessengerChooserList