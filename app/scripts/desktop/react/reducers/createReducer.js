export default function createReducer(initialState, actionMap) {
  return function(state=initialState, { type, ...rest }) {
    const reduceFn = actionMap[type];

    return reduceFn ? reduceFn(state, rest) : state;
  };
}
