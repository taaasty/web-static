import BaseStore from './_base';
import Constants from '../constants/constants';
import AppDispatcher from '../dispatcher/dispatcher';

let _store = {
  flows: {
    items: [],
  },
  isFetching: false,
  sort: null,
  error: null,
};

const FlowsStore = Object.assign(new BaseStore(), {
  getStore() {
    return _store;
  },
});

FlowsStore.dispatchToken = AppDispatcher.register((payload) => {
  const { type, flows, sort, error } = payload.action;

  switch (type) {
  case Constants.flows.INIT:
    _store = {
      flows,
      sort,
      error: null,
      isFetching: false,
    };
    FlowsStore.emitChange();
    break;
  case Constants.flows.REQUEST:
    _store.isFetching = true;
    FlowsStore.emitChange();
    break;
  case Constants.flows.LOAD_MORE:
    const items = _store.flows.items;
    _store.flows = flows;
    _store.flows.items = items.concat(flows.items);
    _store.isFetching = false;
    FlowsStore.emitChange();
    break;
  case Constants.flows.ERROR:
    _store.error = error;
    _store.isFetching = false;
    FlowsStore.emitChange();
    break;
  }
});

export default FlowsStore;
