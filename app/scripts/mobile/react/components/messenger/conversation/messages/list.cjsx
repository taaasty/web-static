_                      = require 'lodash'
MessageListEmpty       = require './list/empty'
MessageListItemManager = require './list/itemManager'
{ PropTypes } = React

MessageList = React.createClass
  displayName: 'MessageList'

  propTypes:
    items:      PropTypes.array.isRequired
    canLoad:    PropTypes.bool.isRequired
    onLoadMore: PropTypes.func.isRequired

  componentDidMount: ->
    unless @isEmpty()
      @saveScrollPosition()
      @scrollToBottom()

  componentWillUpdate: (nextProps) ->
    if @props.items[0]?.uuid isnt nextProps.items[0]?.uuid
      @saveScrollPosition()

  componentDidUpdate: (prevProps) ->
    if prevProps.items[0]?.uuid isnt @props.items[0]?.uuid
      # Подгрузились сообщения из истории
      @restoreScrollPosition()
    else if prevProps.items.length != @props.items.length
      # Добавлено сообщение
      @scrollToBottom()

  render: ->
    if @isEmpty() then <MessageListEmpty /> else @renderListItems()

  renderListItems: ->
    listItems = _.map @props.items, (item) ->
      <MessageListItemManager item={ item } key={ "#{item.id}-#{item.uuid}" } />

    return <div ref="scroller"
                className="messages__scroll"
                onScroll={ @handleScroll }>
             <div className="messages__list">
               <div className="messages__list-cell">
                 { listItems }
               </div>
             </div>
           </div>

  isEmpty: ->
    @props.items.length == 0

  saveScrollPosition: ->
    return unless @refs.scroller?

    scroller = @refs.scroller
    @savedScrollPosition = scroller.scrollHeight - scroller.scrollTop

  restoreScrollPosition: ->
    scroller = @refs.scroller
    scroller.scrollTop = scroller.scrollHeight - @savedScrollPosition

  scrollToBottom: ->
    scroller = @refs.scroller
    scroller.scrollTop = scroller.scrollHeight

  handleScroll: ->
    scroller = @refs.scroller

    if @props.canLoad
      # Подгружаем сообщения если нам осталось проскроллить <= 30% списка сообщений
      @props.onLoadMore() if scroller.scrollTop < @savedScrollPosition * .3

module.exports = MessageList