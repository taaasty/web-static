window       = undefined
React        = require('react');
moment       = require('../../bower_components/momentjs/moment');
EventEmitter = require('eventEmitter');
i18n         = require('i18next');

moment.locale('ru', require('../../bower_components/momentjs/locale/ru'));

Phrases = {
  dev: { translation: require('./locales/i18n/dev') },
  ru: { translation: require('./locales/i18n/ru') }
};

i18n.init({resStore: Phrases});

Routes         = require('../shared/routes/routes');
ApiRoutes      = require('../shared/routes/api');
ThumborService = require('../shared/react/services/thumbor');
EntryPage      = require('./react/pages/entry');