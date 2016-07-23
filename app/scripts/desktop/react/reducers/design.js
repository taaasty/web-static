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
        title: 'PT Sans',
      },
      {
        value: 'ptserif',
        name: 'ptserif',
        free: true,
        title: 'PT Serif',
      },
      {
        value: 'roboto',
        name: 'roboto',
        free: false,
        title: 'Roboto',
      },
      {
        value: 'lora',
        name: 'lora',
        free: false,
        title: 'Lora',
      },
      {
        value: 'philosopher',
        name: 'philosopher',
        free: false,
        title: 'Philosopher',
      },
      {
        value: 'ptmono',
        name: 'ptmono',
        free: false,
        title: 'PT Mono',
      },
      {
        value: 'berenisadfpro',
        name: 'berenisadfpro',
        free: false,
        title: 'Berenis ADF Pro',
      },
      {
        value: 'djserif',
        name: 'djserif',
        free: false,
        title: 'DejaVu Serif Condensed',
      },
      {
        value: 'heuristica',
        name: 'heuristica',
        free: false,
        title: 'Heuristica',
      },
      {
        value: 'permian',
        name: 'permian',
        free: false,
        title: 'Permian Slab Serif',
      },
      {
        value: 'robotoslab',
        name: 'robotoslab',
        free: false,
        title: 'Roboto Slab',
      },
      {
        value: 'clearsans',
        name: 'clearsans',
        free: false,
        title: 'Clear Sans',
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
        title: 'Proxima Nova',
      },
      {
        value: 'notoserif',
        name: 'notoserif',
        free: false,
        title: 'Noto Serif',
      },
      {
        value: 'comfortaa',
        name: 'comfortaa',
        free: false,
        title: 'Comfortaa',
      },
      {
        value: 'airbornepilot',
        name: 'airbornepilot',
        free: false,
        title: 'Airborne Pilot',
      },
      {
        value: 'amaranth',
        name: 'amaranth',
        free: false,
        title: 'Amaranth',
      },
      {
        value: 'beermoney',
        name: 'beermoney',
        free: false,
        title: 'Beer Money',
      },
      {
        value: 'dancingscript',
        name: 'dancingscript',
        free: false,
        title: 'Dancing Script',
      },
      {
        value: 'greatvibes',
        name: 'greatvibes',
        free: false,
        title: 'Great Vibes',
      },
      {
        value: 'veles',
        name: 'veles',
        free: false,
        title: 'Veles',
      },
      {
        value: 'zion',
        name: 'zion',
        free: false,
        title: 'ZionTrain',
      },
      {
        value: 'nautilus',
        name: 'nautilus',
        free: false,
        title: 'Nautilus Pompilius',
      },
      {
        value: 'ospdin',
        name: 'ospdin',
        free: false,
        title: 'OSP-DIN',
      },
      {
        value: 'pecita',
        name: 'pecita',
        free: false,
        title: 'Pecita',
      },
      {
        value: 'poetsen',
        name: 'poetsen',
        free: false,
        title: 'PoetsenOne',
      },
      {
        value: 'yessireebob',
        name: 'yessireebob',
        free: false,
        title: 'Yes Siree Bob',
      },
    ],
    headerSize: [
      {
        value: 'small',
        name: 'small',
        free: false,
        text: () => i18n.t('design_header_size_small'),
      },
      {
        value: 'middle',
        name: 'middle',
        free: true,
        text: () => i18n.t('design_header_size_medium'),
      },
      {
        value: 'large',
        name: 'large',
        free: false,
        text: () => i18n.t('design_header_size_large'),
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
