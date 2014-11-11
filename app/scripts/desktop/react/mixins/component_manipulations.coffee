window.ComponentManipulationsMixin =

  safeUpdate: (func) ->
    func() unless @_isUnmounted()

    return

  safeUpdateState: (newStates) ->
    @setState newStates unless @_isUnmounted()

    return

  _isUnmounted: ->
    @._compositeLifeCycleState == 'UNMOUNTING' ||
    @._compositeLifeCycleState == 'UNMOUNTED'  ||
    @._lifeCycleState == 'UNMOUNTING'          ||
    @._lifeCycleState == 'UNMOUNTED'