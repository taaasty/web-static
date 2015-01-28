React        = require('react');
moment       = require('../../bower_components/momentjs/moment');
EventEmitter = require('eventEmitter');

moment.locale('ru', require('../../bower_components/momentjs/locale/ru'));

Phrases = {
  ru: require('./locales/i18n/ru')
};

// TastySettings  = require('./settings');
Routes         = require('../shared/routes/routes');
ApiRoutes      = require('../shared/routes/api');
ThumborService = require('../shared/react/services/thumbor');
EntryPage      = require('./react/pages/entry');