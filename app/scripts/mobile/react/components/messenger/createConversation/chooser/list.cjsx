_                         = require 'lodash'
MessengerChooserListEmpty = require './list/empty'
MessengerChooserListItem  = require './list/item'
{ PropTypes } = React

MessengerChooserList = React.createClass
  displayName: 'MessengerChooserList'

  propTypes:
    items:        PropTypes.array.isRequired
    loading:      PropTypes.bool.isRequired #TODO: Spinner on load more predictions
    onItemSelect: PropTypes.func.isRequired

  render: ->
    if @isEmpty() then <MessengerChooserListEmpty /> else @renderListItems()

  renderListItems: ->
    listItems = _.map @props.items, (item) =>
      <MessengerChooserListItem
          item={ item }
          onSelect={ @props.onItemSelect }
          key={ item.id } />

    return <div className="messages__chooser-dropdown">
             <ul className="messages__chooser-results">
               { listItems }
             </ul>
           </div>

  isEmpty: ->
    @props.items.length == 0

module.exports = MessengerChooserList