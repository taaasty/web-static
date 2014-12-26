EventEmitter   = require('eventEmitter');
React          = require('react');

moment         = require('../../bower_components/momentjs/moment');
moment.locale('ru', require('../../bower_components/momentjs/locale/ru'));

Routes         = require('../shared/routes/routes');
ApiRoutes      = require('../shared/routes/api');
ThumborService = require('../shared/react/services/thumbor');
TastySettings  = require('./settings');
EntryPage      = require('./react/pages/entry');