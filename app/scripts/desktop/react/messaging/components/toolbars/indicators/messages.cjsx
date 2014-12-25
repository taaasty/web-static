cx = require 'react/lib/cx'

window.IndicatorsToolbar_Messages = React.createClass

  propTypes:
    onClick: React.PropTypes.func.isRequired

  getInitialState: -> @getStateFromStore()

  componentDidMount: ->
    MessagingStatusStore.addChangeListener @_onStoreChange

  componentWillUnmount: ->
    MessagingStatusStore.removeChangeListener @_onStoreChange

  render: ->
    indicatorClasses = cx
      'toolbar__indicator': true
      'toolbar__indicator--messages': true
      'state--empty': @state.unreadConversationsCount == 0

    if @hasUnreadConversations()
      return <div className={ indicatorClasses }
                  onClick={ this.props.onClick }>
               <span className="messages-badge">
                 { this.state.unreadConversationsCount }
               </span>
               <i className="icon icon--messages" />
             </div>
    else
      return null

  hasUnreadConversations: -> @state.unreadConversationsCount?

  getStateFromStore: ->
    unreadConversationsCount: MessagingStatusStore.getUnreadConversationsCount()
    activeConversationsCount: MessagingStatusStore.getActiveConversationsCount()

  _onStoreChange: ->
    @setState @getStateFromStore()