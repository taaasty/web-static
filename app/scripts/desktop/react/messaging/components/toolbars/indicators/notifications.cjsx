classnames = require 'classnames'
MessagesPopupActions = require '../../../actions/MessagesPopupActions';

window.IndicatorsToolbar_Notifications = React.createClass

  propTypes:
    onClick: React.PropTypes.func.isRequired

  getInitialState: -> @getStateFromStore()

  componentDidMount: ->
    MessagingStatusStore.addChangeListener @_onStoreChange

  componentDidUpdate: (prevProps, prevState) ->
    if prevState.unreadNotificationsCount > 0 && !@hasUnreadNotifications()
      MessagesPopupActions.closeNotificationsPopup()

  componentWillUnmount: ->
    MessagingStatusStore.removeChangeListener @_onStoreChange

  render: ->
    indicatorClasses = classnames('toolbar__indicator', 'toolbar__indicator--notifications', {
      'state--empty': @state.unreadNotificationsCount == 0
    })

    if @hasUnreadNotifications()
      return <div className={ indicatorClasses }
                  onClick={ this.props.onClick }>
               <span className="notifications-badge">
                 { this.state.unreadNotificationsCount }
               </span>
               <i className="icon icon--bell"></i>
             </div>
    else
      return null

  hasUnreadNotifications: -> @state.unreadNotificationsCount?

  getStateFromStore: ->
    unreadNotificationsCount: MessagingStatusStore.getUnreadNotificationsCount()

  _onStoreChange: ->
    @setState @getStateFromStore()