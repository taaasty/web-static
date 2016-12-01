import createReducer from './createReducer';
import { fromJS } from 'immutable';
import {
  ADS_REQUEST,
  ADS_SUCCESS,
  ADS_FAILURE,
  ADS_SET_AD,
} from '../actions/AdsActions';
import { random } from 'lodash';
import { List } from 'immutable';

const initialState = fromJS({
  items: [],
  time: null,
  currentId: null,
  isFetching: false,
  error: null,
});

const actionMap = {
  [ADS_REQUEST](state) {
    return state.merge({
      isFetching: true,
      error: null,
    });
  },

  [ADS_SUCCESS](state, { response }) {
    return state.merge({
      items: response.result,
      isFetching: false,
      error: null,
    });
  },

  [ADS_FAILURE](state, { error }) {
    return state.merge({
      error,
      isFetching: false,
    });
  },

  [ADS_SET_AD](state, { time }) {
    const itemsSize = state.get('items', List()).size;

    return itemsSize > 0
      ? state.merge({
          time,
          currentId: state.getIn(['items', random(itemsSize - 1)]),
        })
      : state;
  },
};

export default createReducer(initialState, actionMap);
