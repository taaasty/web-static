const initialState = {
  items: [],
  has_more: null,
  next_since_entry_id: null,
};

const actionMap = {
  
};

export default function tlogEntries(state=initialState, { type, payload }) {
  const reduceFn = actionMap[type];
  if (!reduceFn) {
    return state;
  }

  return reduceFn(state, payload);
}
