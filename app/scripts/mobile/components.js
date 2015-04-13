window       = undefined; // React-rails set window to this, it's unexpected behavior
React        = require('react');
moment       = require('../../../node_modules/moment');
EventEmitter = require('eventEmitter');
i18n         = require('i18next');

/*==========  Locales  ==========*/
require('./locales/moment/ru');

Phrases = {
  ru: { translation: require('./locales/ru') }
};

i18n.init({
  resStore: Phrases,
  fallbackLng: 'ru'
});

Routes              = require('../shared/routes/routes');
ApiRoutes           = require('../shared/routes/api');
ThumborService      = require('../shared/react/services/thumbor');
EntryPage           = require('./react/pages/entry');
TlogRegularPage     = require('./react/pages/tlogRegular');
TlogDaylogPage      = require('./react/pages/tlogDaylog');
FeedLivePage        = require('./react/pages/feedLive');
FeedBestPage        = require('./react/pages/feedBest');
FeedFriendsPage     = require('./react/pages/feedFriends');
SettingsPage        = require('./react/pages/settings');
NotificationsPage   = require('./react/pages/notifications');
MessengerPage       = require('./react/pages/messenger');
MessengerThreadPage = require('./react/pages/messengerThread');
AuthPage            = require('./react/pages/auth');