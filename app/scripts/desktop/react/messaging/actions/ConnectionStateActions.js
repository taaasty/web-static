import {
  CONNECTION_STATE_NOT_CONNECTED,
  CONNECTION_STATE_PROCESS,
  CONNECTION_STATE_CONNECTED,
  CONNECTION_STATE_ERROR,
} from '../constants';

export const MSG_CONNECTION_STATE_SET = 'MSG_CONNECTION_STATE_SET';

function connectionStateSet(state) {
  return {
    type: MSG_CONNECTION_STATE_SET,
    state,
  };
}

export function connectionStateNotConnected() {
  return connectionStateSet(CONNECTION_STATE_NOT_CONNECTED);
}

export function connectionStateProcess() {
  return connectionStateSet(CONNECTION_STATE_PROCESS);
}

export function connectionStateConnected() {
  return connectionStateSet(CONNECTION_STATE_CONNECTED);
}

export function connectionStateError() {
  return connectionStateSet(CONNECTION_STATE_ERROR);
}
