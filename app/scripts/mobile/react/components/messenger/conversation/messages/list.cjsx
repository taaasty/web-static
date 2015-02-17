_                = require 'lodash'
MessageListEmpty = require './list/empty'
MessageListItem  = require './list/item'
{ PropTypes } = React

MessageList = React.createClass
  displayName: 'MessageList'

  propTypes:
    items: PropTypes.array.isRequired

  componentDidMount: ->
    @scrollToBottom() unless @isEmpty()

  render: ->
    if @isEmpty() then <MessageListEmpty /> else @renderListItems()

  renderListItems: ->
    listItems = _.map @props.items, (item) ->
      <MessageListItem item={ item } key={ item.id } />

    return <div ref="scroller"
                className="messages__scroll">
             <div className="messages__list">
               <div className="messages__list-cell">
                 { listItems }
               </div>
             </div>
           </div>

  isEmpty: ->
    @props.items.length == 0

  scrollToBottom: ->
    scroller = @refs.scroller.getDOMNode()
    scroller.scrollTop = scroller.scrollHeight

module.exports = MessageList