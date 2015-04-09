import assign from 'react/lib/Object.assign';
import BaseStore from './_base';
import AppDispatcher from '../dispatchers/dispatcher';
import DesignConstants from '../constants/design';
import DesignOptions from '../models/designOptions';
import DesignPaymentOptions from '../models/designPaymentOptions';
import DesignSet from '../entities/designSet';
import DesignOptionsService from '../services/designOptions';

let _designSet = {};
let _unsavedFields = {};
const _designOptions = DesignOptions,
      _designPaymentOptions = DesignPaymentOptions;

function initDesignSet(design) {
  _designSet = new DesignSet(design);
}

function updateDesignSet(design) {
  _designSet.current = design;
}

function changeOption(name, value) {
  _unsavedFields[name] = value;

  // Если мы поменяли значение, и оно совпадает с тем что было в самом начале, то
  // удаляем это поле из "Несохранённых".
  if (_unsavedFields[name] === _designSet.current[name]) {
    delete _unsavedFields[name];
  }
}

let DesignStore = assign(new BaseStore(), {

  getOrigin() {
    return _designSet.origin || null;
  },

  getCurrent() {
    let design;

    if (this.hasUnsavedFields()) {
      design = assign({}, _designSet.current, this.getUnsavedFields());
    } else {
      design = _designSet.current;
    }

    return design || null;
  },

  getOptions() {
    return _designOptions;
  },

  getPaymentOptions() {
    return _designPaymentOptions;
  },

  getUnsavedFields() {
    return _unsavedFields;
  },

  hasPaidValues() {
    let design;

    if (this.hasUnsavedFields()) {
      design = assign({}, this.getCurrent(), this.getUnsavedFields());
    } else {
      design = this.getCurrent();
    }

    return DesignOptionsService.hasPaidValues(design);
  },

  hasUnsavedFields() {
    return !!_unsavedFields;
  }
});

DesignStore.dispatchToken = AppDispatcher.register(function(payload) {
  let { action } = payload;

  switch(action.type) {
    case DesignConstants.INIT_CURRENT:
      initDesignSet(action.design);
      DesignStore.emitChange();
      break;

    case DesignConstants.CHANGE_OPTION:
      let { name, value } = action;

      changeOption(name, value);
      DesignStore.emitChange();
      break;

    case DesignConstants.CLOSE_DESIGN_SETTINGS:
      _unsavedFields = {};
      DesignStore.emitChange();
      break;

    case DesignConstants.SAVE_CURRENT_SUCCESS:
      _unsavedFields = {};
      updateDesignSet(action.design);
      DesignStore.emitChange();
      break;
  }

  return true; //It is necessary for correct waitFor work
});

export default DesignStore;