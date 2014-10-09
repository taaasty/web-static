CONNECTION_EVENT = 'connectionStateUpdated'

_connectionState = null

window.ConnectionStateStore = _.extend {}, EventEmitter.prototype, {
  PROCESS_STATE:       'process'
  ERROR_STATE:         'error'
  CONNECTED_STATE:     'connected'
  NOT_CONNECTED_STATE: 'notconnected'

  emitUpdate: -> @emit CONNECTION_EVENT

  addUpdateListener:    (callback) -> @on  CONNECTION_EVENT, callback
  removeUpdateListener: (callback) -> @off CONNECTION_EVENT, callback

  getConnectionState: -> _connectionState

  _update: (state) -> _connectionState = state

}

_connectionState = ConnectionStateStore.NOT_CONNECTED_STATE

ConnectionStateStore.dispatchToken = MessagingDispatcher.register (payload) ->
  action = payload.action

  switch action.type
    when 'connectionState'
      ConnectionStateStore._update action.state
      ConnectionStateStore.emitUpdate()
      break