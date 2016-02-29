import createReducer from './createReducer';

const initialState = {
  data: {},
  isFetching: false,
  error: null,
};

const actionMap = {
  [APP_STATS_RECEIVE](state, data) {
    
  },

  [APP_STATS_REQUEST](state) {
    
  },
  
};

export default createReducer(initialState, actionMap);
