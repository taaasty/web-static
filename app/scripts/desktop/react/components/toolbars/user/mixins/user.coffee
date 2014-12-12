window.UserToolbarMixin =

  componentWillUpdate: (nextProps, nextState) ->
    if @state.currentState isnt nextState.currentState
      switch
        when @isOpenedByClickState(), @isOpenedByHoverState()
          TastyEvents.emit TastyEvents.keys.user_toolbar_opened()
        when @isClosedState()
          TastyEvents.emit TastyEvents.keys.user_toolbar_closed()