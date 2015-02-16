require './resources/libs'
require './resources/locales'
global.Routes    = require '../shared/routes/routes'
global.ApiRoutes = require '../shared/routes/api'
require './react/application'

# /*==========  Services  ==========*/

global.ThumborService = require '../shared/react/services/thumbor'

# /*==========  Components  ==========*/

require './react/components/auth/auth'
require './react/components/auth/authEmailSignIn'
require './react/components/auth/authEmailSignUp'

# /*==========  Pages  ==========*/

global.EntryPage         = require './react/pages/entry'
global.TlogRegularPage   = require './react/pages/tlogRegular'
global.TlogDaylogPage    = require './react/pages/tlogDaylog'
global.FeedLivePage      = require './react/pages/feedLive'
global.FeedBestPage      = require './react/pages/feedBest'
global.FeedFriendsPage   = require './react/pages/feedFriends'
global.SettingsPage      = require './react/pages/settings'
global.NotificationsPage = require './react/pages/notifications'
global.MessengerPage     = require './react/pages/messenger'

# /*==========  Stores  ==========*/

require './react/stores/currentUser'
require './react/stores/relationships'
require './react/stores/feed'