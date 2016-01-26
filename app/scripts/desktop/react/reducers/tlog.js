const initialState = {
  author: {},
  design: {
    backgroundImageUrl: '',
    feedOpacity: '',
  },
  slug: '',
  tlog_url: '',
  my_relationship: '',
  stats: {},
};

const actionMap = {
  
};

export default function tlog(state=initialState, { type, payload }) {
  const reduceFn = actionMap[type];
  if (!reduceFn) {
    return state;
  }

  return reduceFn(state, payload);
}
