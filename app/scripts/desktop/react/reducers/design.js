/*
# backgroundAlignment (enum) - Выравнивание фоновой картинки.
# backgroundColor (RGB hex) - Цвет фона.
# backgroundImageEnabled (bool) - Вкл/Выкл фоновую картинку.
# backgroundImageUrl (url) - Фоновая картинка.
# feedBackgroundColor (RGB hex) - Цвет фона ленты.
# feedColor (RGB hex)
# feedFont (enum) - Шрифт текста ленты.
# feedFontColor (RGB hex) - Цвет текста ленты.
# feedOpacity (range) - Непрозрачность ленты. (0-1)
# headColor (RGB hex)
# headerColor (RGB hex) - Цвет заголовка.
# headerFont (enum) - Шрифт заголовка.
# headerSize (enum) - Размер заголовка.
*/

import createReducer from './createReducer';
import {
  DESIGN_SET_OPTION,
  DESIGN_RESET_CHANGES,
  DESIGN_SAVE_REQUEST,
  DESIGN_SAVE_SUCCESS,
  DESIGN_SAVE_FAILURE,
} from '../actions/DesignActions';
import { Map, fromJS } from 'immutable';

const initialState = fromJS({
  availableOptions: {
    backgroundAlignment: [
      'justify', 'center',
    ],
    backgroundColor: [
      '#ffffff', '#000000', '#e74c3c', '#c6c9cc', '#6c7a89', ':ANY:',
    ],
    feedBackgroundColor: [
      '#ffffff', '#000000', '#e74c3c', '#c6c9cc', '#6c7a89', ':ANY:',
    ],
    feedFont: [
      'ptsans', 'ptserif', 'roboto', 'lora', 'philosopher', 'ptmono', 'berenisadfpro',
      'djserif', 'heuristica', 'permian', 'robotoslab', 'clearsans',
    ],
    feedFontColor: [
      '#ffffff', '#000000', '#c6c9cc', '#6c7a89', '#38434e', ':ANY:',
    ],
    headerColor: [
      '#ffffff', '#000000', '#2ac67e', '#e74c3c', '#6c7a89', '#38434e', ':ANY:',
    ],
    headerFont: [
      'proximanova', 'notoserif', 'comfortaa', 'airbornepilot', 'amaranth', 'beermoney',
      'dancingscript', 'greatvibes', 'veles', 'zion', 'nautilus', 'ospdin', 'pecita',
      'poetsen', 'yessireebob',
    ],
    headerSize: [
      'small', 'middle', 'large',
    ],
  },
  freeOptions: {
    backgroundAlignment: ['justify', 'center'],
    backgroundColor: ['#ffffff', '#000000'],
    backgroundImageEnabled: ':ANY:',
    backgroundImageUrl: ':ANY:',
    feedBackgroundColor: ['#ffffff', '#000000'],
    feedFont: ['ptsans', 'ptserif'],
    feedFontColor: ['#ffffff', '#000000'],
    feedOpacity: ':ANY:',
    headerColor: ['#ffffff', '#000000'],
    headerFont: ['proximanova'],
    headerSize: ['middle'],
  },
  changes: {},
  isFetching: false,
  error: null,
});

const actionMap = {
  [DESIGN_RESET_CHANGES](state) {
    return state.set('changes', Map());
  },

  [DESIGN_SET_OPTION](state, { name, value }) {
    return state.setIn([ 'changes', name ], value);
  },

  [DESIGN_SAVE_REQUEST](state) {
    return state.merge({
      isFetching: true,
      error: null,
    });
  },

  [DESIGN_SAVE_SUCCESS](state) {
    return state.merge({
      changes: {},
      isFetching: false,
      error: null,
    });
  },

  [DESIGN_SAVE_FAILURE](state, { error }) {
    return state.merge({
      error,
      isFetching: false,
    });
  },
};

export default createReducer(initialState, actionMap);
