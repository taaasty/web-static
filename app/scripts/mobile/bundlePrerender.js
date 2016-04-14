window       = undefined; // React-rails set window to this, it's unexpected behavior
React        = require('react');
moment       = require('../../../node_modules/moment');
EventEmitter = require('eventEmitter');
i18n         = require('i18next');

/*==========  Locales  ==========*/
require('./locales/moment/ru');

Phrases = {
  ru: { translation: require('./locales/ru') },
  en: { translation: require('./locales/en') },
};

i18n.init({
  resources: Phrases,
  fallbackLng: 'ru',
});

Routes              = require('../shared/routes/routes');
ApiRoutes           = require('../shared/routes/api');
ThumborService      = require('../shared/react/services/thumbor');

SettingsPage = require('./react/components/SettingsPage');
FlowPage = require('./react/components/FlowPage');
TlogRegularPage = require('./react/components/TlogRegularPage');
FeedLivePage = require('./react/components/FeedLivePage');
MessengerPage = require('./react/components/MessengerPage');
MessengerThreadPage = require('./react/components/MessengerThreadPage');
FeedBestPage = require('./react/components/FeedBestPage');
FeedFriendsPage = require('./react/components/FeedFriendsPage');
NotificationsPage = require('./react/components/NotificationsPage');
TlogDaylogPage = require('./react/components/TlogDaylogPage');
EntryPage = require('./react/components/EntryPage');
AuthPage = require('./react/components/AuthPage');
FlowsPage = require('./react/components/FlowsPage');
