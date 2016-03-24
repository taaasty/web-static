/*global EventEmitter */
import MessagingDispatcher from '../MessagingDispatcher';

const CONNECTION_EVENT = 'connectionStateUpdated';
let _connectionState = null;

const ConnectionStateStore = Object.assign({}, EventEmitter.prototype, {
  PROCESS_STATE: 'process',
  ERROR_STATE: 'error',
  CONNECTED_STATE: 'connected',
  NOT_CONNECTED_STATE: 'notconnected',

  emitUpdate() {
    return this.emit(CONNECTION_EVENT);
  },

  addUpdateListener(callback) {
    return this.on(CONNECTION_EVENT, callback);
  },

  removeUpdateListener(callback) {
    return this.off(CONNECTION_EVENT, callback);
  },

  getConnectionState() {
    return _connectionState;
  },

  _update(state) {
    _connectionState = state;
  },
});

_connectionState = ConnectionStateStore.NOT_CONNECTED_STATE;

ConnectionStateStore.dispatchToken = MessagingDispatcher.register(({ action }) => {
  switch (action.type) {
  case 'connectionState':
    ConnectionStateStore._update(action.state);
    ConnectionStateStore.emitUpdate();
    break;
  };
});

export default ConnectionStateStore;
