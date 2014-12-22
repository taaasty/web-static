ComponentMixin =

  safeUpdate: (func) ->
    func() unless @_isUnmounted()

  safeUpdateState: (newStates) ->
    @setState newStates unless @_isUnmounted()

  _isUnmounted: ->
    @_compositeLifeCycleState is 'UNMOUNTING' ||
    @_compositeLifeCycleState is 'UNMOUNTED'  ||
    @_lifeCycleState is 'UNMOUNTING'          ||
    @_lifeCycleState is 'UNMOUNTED'

module.exports = ComponentMixin