import Constants from '../constants/constants';
import AppDispatcher from '../dispatchers/dispatcher';

let ToolbarActionCreators = {
  initVisibility(value) {
    ReactApp.layoutStatesController.toggleState('userToolbar', value);
  },

  toggleOpenness(value) {
    ReactApp.layoutStatesController.toggleState('userToolbar', value);
  }
};

export default ToolbarActionCreators;