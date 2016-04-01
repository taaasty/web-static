# /*==========  Shims  ==========*/
require '../shared/shims/console'

require './resources/Libs'
global.Routes = require '../shared/routes/routes'
global.ApiRoutes = require '../shared/routes/api'
global.ReactApp = require './react/ReactApp';

# /*==========  Locales  ==========*/
require './locales/moment/ru'

# /*==========  Services  ==========*/

global.ThumborService = require '../shared/react/services/thumbor'

# /*==========  Components  ==========*/

require './react/components/auth/auth'
require './react/components/auth/authEmailSignIn'
require './react/components/auth/authEmailSignUp'

# /*==========  Pages  ==========*/

global.EntryPage           = require './react/pages/entry'
global.TlogDaylogPage      = require './react/pages/tlogDaylog'
global.FeedBestPage        = require './react/pages/feedBest'
global.FeedFriendsPage     = require './react/pages/feedFriends'
global.NotificationsPage   = require './react/pages/notifications'
global.AuthPage            = require './react/pages/auth'

global.FlowPage            = require './react/components/FlowPage';
global.SettingsPage        = require './react/components/SettingsPage';
global.TlogRegularPage     = require './react/components/TlogRegularPage';
global.FeedLivePage        = require './react/components/FeedLivePage';
global.MessengerPage       = require './react/components/MessengerPage';
global.MessengerThreadPage = require './react/components/MessengerThreadPage';

# /*==========  Stores  ==========*/

require './react/stores/conversation'
require './react/stores/currentUser'
require './react/stores/feed'
require './react/stores/message'
require './react/stores/messagingStatus'
require './react/stores/notification'
require './react/stores/relationships'
