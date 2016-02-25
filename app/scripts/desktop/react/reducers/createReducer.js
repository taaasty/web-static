export default function createReducer(initialState, actionMap) {
  return function(state=initialState, { type, payload }) {
    const reduceFn = actionMap[type];

    return reduceFn ? reduceFn(state, payload) : state;
  };
}
