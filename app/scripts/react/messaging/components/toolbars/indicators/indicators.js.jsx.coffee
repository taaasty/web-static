###* @jsx React.DOM ###

MOUSE_LEAVE_TIMEOUT = 800
BASIC_STATE    = 'basic'
ADVANCED_STATE = 'advanced'

window.IndicatorsToolbar = React.createClass
  mixins: [ComponentManipulationsMixin]

  getInitialState: ->
    _.extend @getStateFromStore(), {
      currentState: BASIC_STATE
    }

  componentDidMount: ->
    ConnectionStateStore.addUpdateListener @_onStoreChange

    $(document).on 'click', @_onDocumentClick
    TastyEvents.on TastyEvents.keys.user_toolbar_closed(), @_onUserToolbarClose
    TastyEvents.on TastyEvents.keys.user_toolbar_opened(), @_onUserToolbarOpen

  componentWillUnmount: ->
    clearTimeout @timeout if @timeout
    ConnectionStateStore.removeUpdateListener @_onStoreChange

    $(document).off 'click', @_onDocumentClick
    TastyEvents.off TastyEvents.keys.user_toolbar_closed(), @_onUserToolbarClose
    TastyEvents.off TastyEvents.keys.user_toolbar_opened(), @_onUserToolbarOpen

  render: ->
    indicatorsClasses = React.addons.classSet {
      'toolbar__indicators': true
      'state--advanced': @isAdvancedState()
      'state--basic':    @isBasicState()
    }

    if ConnectionStateStore.CONNECTED_STATE
      indicators = `<div className={ indicatorsClasses }
                         onMouseEnter={ this.handleMouseEnter }
                         onMouseLeave={ this.handleMouseLeave }>
                      <IndicatorsToolbar_Messages onClick={ this.handleMessagesClick } />
                      <IndicatorsToolbar_Notifications onClick={ this.handleNotificationsClick } />
                    </div>`

    indicators

  isBasicState:    -> @state.currentState is BASIC_STATE
  isAdvancedState: -> @state.currentState is ADVANCED_STATE

  activateBasicState:    -> @setState(currentState: BASIC_STATE)
  activateAdvancedState: -> @setState(currentState: ADVANCED_STATE)

  getStateFromStore: ->
    connectionState: ConnectionStateStore.getConnectionState()

  handleMessagesClick: ->
    PopupActions.toggleMessagesPopup() if @isAdvancedState()

  handleNotificationsClick: ->
    PopupActions.toggleNotificationsPopup() if @isAdvancedState()

  handleMouseEnter: ->
    clearTimeout @timeout if @timeout

    @setState {
      isHovered: true
      currentState: ADVANCED_STATE
    }

  handleMouseLeave: ->
    @safeUpdateState { isHovered: false }

    unless messagingService.isNotificationsPopupShown()
      @timeout = setTimeout (=>
        @safeUpdateState { currentState: BASIC_STATE }
      ), MOUSE_LEAVE_TIMEOUT

  _onUserToolbarOpen: ->
    clearTimeout @timeout if @timeout

    @activateAdvancedState()

  _onUserToolbarClose: ->
    @activateBasicState() unless @state.isHovered

  _onDocumentClick: (e) ->
    unless $(e.target).closest('.toolbar__indicators').length && @isAdvancedState()
      PopupActions.closeNotificationsPopup()
      @activateBasicState()

  _onStoreChange: ->
    @setState @getStateFromStore()