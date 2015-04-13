require './resources/libs'
global.Routes    = require '../shared/routes/routes'
global.ApiRoutes = require '../shared/routes/api'
require './react/application'

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
global.TlogRegularPage     = require './react/pages/tlogRegular'
global.TlogDaylogPage      = require './react/pages/tlogDaylog'
global.FeedLivePage        = require './react/pages/feedLive'
global.FeedBestPage        = require './react/pages/feedBest'
global.FeedFriendsPage     = require './react/pages/feedFriends'
global.SettingsPage        = require './react/pages/settings'
global.NotificationsPage   = require './react/pages/notifications'
global.MessengerPage       = require './react/pages/messenger'
global.MessengerThreadPage = require './react/pages/messengerThread'
global.AuthPage            = require './react/pages/auth'

# /*==========  Stores  ==========*/

require './react/stores/conversation'
require './react/stores/currentUser'
require './react/stores/feed'
require './react/stores/message'
require './react/stores/messagingStatus'
require './react/stores/notification'
require './react/stores/relationships'