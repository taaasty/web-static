EventEmitter   = require('eventEmitter');
React          = require('react');

moment         = require('../../bower_components/momentjs/moment');
moment.locale('ru', require('../../bower_components/momentjs/locale/ru'));

Polyglot  = require('node-polyglot');
phrasesRu = require('./locales/i18n/ru');

polyglot = new Polyglot({
  locale:  'ru',
  phrases: phrasesRu
});

t = polyglot.t.bind(polyglot);

Routes         = require('../shared/routes/routes');
ApiRoutes      = require('../shared/routes/api');
ThumborService = require('../shared/react/services/thumbor');
TastySettings  = require('./settings');
EntryPage      = require('./react/pages/entry');