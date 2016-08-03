import connectionState from './connectionState';
import messages from './messages';

export default function (state, action) {
  return {
    connectionState: connectionState(state.connectionState, action),
    messages: messages(state.messages, action),
  };
}
