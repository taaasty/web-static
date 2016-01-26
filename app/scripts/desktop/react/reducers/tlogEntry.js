const initialState = {
};

const actionMap = {
  
};

export default function tlogEntry(state=initialState, { type, payload }) {
  const reduceFn = actionMap[type];
  if (!reduceFn) {
    return state;
  }

  return reduceFn(state, payload);
}
