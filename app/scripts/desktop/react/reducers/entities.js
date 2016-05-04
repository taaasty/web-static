import { merge } from 'lodash';

const initialState = {
  tlog: {},
  rel: {},
  calendar: {},
  calendarPeriod: {},
  marker: {},
  flow: {},
  flowCollItem: {},
  staff: {},
  comment: {},
  entry: {},
  entryCollItem: {},
  message: {},
  notification: {},
  conversation: {},
};

function entities(state=initialState, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  return state;
}

export default entities;
