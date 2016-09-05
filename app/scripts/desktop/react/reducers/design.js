/*global i18n */
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
      {
        value: 'justify',
        name: 'justify',
        free: true,
        title: () => i18n.t('design_background_alignment_justify'),
      },
      {
        value: 'center',
        name: 'center',
        free: true,
        title: () => i18n.t('design_background_alignment_center'),
      },
    ],
    backgroundColor: [
      {
        value: '#ffffff',
        name: 'white',
        free: true,
        title: () => i18n.t('design_colors_white'),
      },
      {
        value: '#000000',
        name: 'black',
        free: true,
        title: () => i18n.t('design_colors_black'),
      },
      {
        value: '#e74c3c',
        name: 'cinnabar',
        free: false,
        title: () => i18n.t('design_colors_cinnabar'),
      },
      {
        value: '#c6c9cc',
        name: 'silversand',
        free: false,
        title: () => i18n.t('design_colors_silversand'),
      },
      {
        value: '#6c7a89',
        name: 'bluegray',
        free: false,
        title: () => i18n.t('design_colors_bluegray'),
      },
      {
        value: ':COLOR_PICKER:',
        name: 'custom',
        free: false,
        title: () => i18n.t('design_colors_custom'),
      },
    ],
    backgroundImageEnabled: ':ANY:',
    backgroundImageUrl: ':ANY:',
    feedBackgroundColor: [
      {
        value: '#ffffff',
        name: 'white',
        free: true,
        title: () => i18n.t('design_colors_white'),
      },
      {
        value: '#000000',
        name: 'black',
        free: true,
        title: () => i18n.t('design_colors_black'),
      },
      {
        value: '#e74c3c',
        name: 'cinnabar',
        free: false,
        title: () => i18n.t('design_colors_cinnabar'),
      },
      {
        value: '#c6c9cc',
        name: 'silversand',
        free: false,
        title: () => i18n.t('design_colors_silversand'),
      },
      {
        value: '#6c7a89',
        name: 'bluegray',
        free: false,
        title: () => i18n.t('design_colors_bluegray'),
      },
      {
        value: ':COLOR_PICKER:',
        name: 'custom',
        free: false,
        title: () => i18n.t('design_colors_custom'),
      },
    ],
    feedFont: [
      {
        value: 'ptsans',
        name: 'ptsans',
        free: true,
        title: 'Aa',
      },
      {
        value: 'ptserif',
        name: 'ptserif',
        free: true,
        title: 'Aa',
      },
      {
        value: 'roboto',
        name: 'roboto',
        free: false,
        title: 'Aa',
      },
      {
        value: 'lora',
        name: 'lora',
        free: false,
        title: 'Aa',
      },
      {
        value: 'philosopher',
        name: 'philosopher',
        free: false,
        title: 'Aa',
      },
      {
        value: 'ptmono',
        name: 'ptmono',
        free: false,
        title: 'Aa',
      },
      {
        value: 'berenisadfpro',
        name: 'berenisadfpro',
        free: false,
        title: 'Aa',
      },
      {
        value: 'djserif',
        name: 'djserif',
        free: false,
        title: 'Aa',
      },
      {
        value: 'heuristica',
        name: 'heuristica',
        free: false,
        title: 'Aa',
      },
      {
        value: 'permian',
        name: 'permian',
        free: false,
        title: 'Aa',
      },
      {
        value: 'robotoslab',
        name: 'robotoslab',
        free: false,
        title: 'Aa',
      },
      {
        value: 'clearsans',
        name: 'clearsans',
        free: false,
        title: 'Aa',
      },
    ],
    feedFontColor: [
      {
        value: '#ffffff',
        name: 'white',
        free: true,
        title: () => i18n.t('design_colors_white'),
      },
      {
        value: '#000000',
        name: 'black',
        free: true,
        title: () =>i18n.t('design_colors_black'),
      },
      {
        value: '#c6c9cc',
        name: 'silversand',
        free: false,
        title: () => i18n.t('design_colors_silversand'),
      },
      {
        value: '#6c7a89',
        name: 'bluegray',
        free: false,
        title: () => i18n.t('design_colors_bluegray'),
      },
      {
        value: '#38434e',
        name: 'madison',
        free: false,
        title: () => i18n.t('design_colors_madison'),
      },
      {
        value: ':COLOR_PICKER:',
        name: 'custom',
        free: false,
        title: () => i18n.t('design_colors_custom'),
      },
    ],
    feedOpacity: ':ANY:',
    headerColor: [
      {
        value: '#ffffff',
        name: 'white',
        free: true,
        title: () => i18n.t('design_colors_white'),
      },
      {
        value: '#000000',
        name: 'black',
        free: true,
        title: () => i18n.t('design_colors_black'),
      },
      {
        value: '#2ac67e',
        name: 'shamrock',
        free: false,
        title: () => i18n.t('design_colors_shamrock'),
      },
      {
        value: '#e74c3c',
        name: 'cinnabar',
        free: false,
        title: () => i18n.t('design_colors_cinnabar'),
      },
      {
        value: '#6c7a89',
        name: 'bluegray',
        free: false,
        title: () => i18n.t('design_colors_bluegray'),
      },
      {
        value: '#38434e',
        name: 'madison',
        free: false,
        title: () => i18n.t('design_colors_madison'),
      },
      {
        value: ':COLOR_PICKER:',
        name: 'custom',
        free: false,
        title: () => i18n.t('design_colors_custom'),
      },
    ],
    headerFont: [
      {
        value: 'proximanova',
        name: 'proximanova',
        free: true,
        title: 'Aa',
      },
      {
        value: 'notoserif',
        name: 'notoserif',
        free: false,
        title: 'Aa',
      },
      {
        value: 'comfortaa',
        name: 'comfortaa',
        free: false,
        title: 'Aa',
      },
      {
        value: 'airbornepilot',
        name: 'airbornepilot',
        free: false,
        title: 'Aa',
      },
      {
        value: 'amaranth',
        name: 'amaranth',
        free: false,
        title: 'Aa',
      },
      {
        value: 'beermoney',
        name: 'beermoney',
        free: false,
        title: 'Aa',
      },
      {
        value: 'dancingscript',
        name: 'dancingscript',
        free: false,
        title: 'Aa',
      },
      {
        value: 'greatvibes',
        name: 'greatvibes',
        free: false,
        title: 'Aa',
      },
      {
        value: 'veles',
        name: 'veles',
        free: false,
        title: 'Aa',
      },
      {
        value: 'zion',
        name: 'zion',
        free: false,
        title: 'Aa',
      },
      {
        value: 'nautilus',
        name: 'nautilus',
        free: false,
        title: 'Aa',
      },
      {
        value: 'ospdin',
        name: 'ospdin',
        free: false,
        title: 'Aa',
      },
      {
        value: 'pecita',
        name: 'pecita',
        free: false,
        title: 'Aa',
      },
      {
        value: 'poetsen',
        name: 'poetsen',
        free: false,
        title: 'Aa',
      },
      {
        value: 'yessireebob',
        name: 'yessireebob',
        free: false,
        title: 'Aa',
      },
    ],
    headerSize: [
      {
        value: 'small',
        name: 'small',
        free: false,
        title: () => i18n.t('design_header_size_small'),
      },
      {
        value: 'middle',
        name: 'middle',
        free: true,
        title: () => i18n.t('design_header_size_medium'),
      },
      {
        value: 'large',
        name: 'large',
        free: false,
        title: () => i18n.t('design_header_size_large'),
      },
    ],
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
