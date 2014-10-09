###* @jsx React.DOM ###

window.IndicatorsToolbar_Messages = React.createClass

  getInitialState: -> @getStateFromStore()

  componentDidMount: ->
    MessagingStatusStore.addChangeListener @_onStoreChange

  componentWillUnmount: ->
    MessagingStatusStore.removeChangeListener @_onStoreChange

  render: ->
    if @hasUnreadConversations()
      return `<div className="toolbar__indicator"
                   onClick={ this.handleClick }>
                <span className="messages-badge">
                  { this.state.unreadConversationsCount }
                </span>
              </div>`
    else
      return null

  handleClick: ->
    PopupActions.toggleMessagesPopup()

  hasUnreadConversations: -> !!@state.unreadConversationsCount

  getStateFromStore: ->
    unreadConversationsCount: MessagingStatusStore.getUnreadConversationsCount()
    activeConversationsCount: MessagingStatusStore.getActiveConversationsCount()

  _onStoreChange: ->
    @setState @getStateFromStore()