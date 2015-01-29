require './resources/libs'
require './resources/locales'
window.Routes    = require '../shared/routes/routes'
window.ApiRoutes = require '../shared/routes/api'
require './react/application'

# /*==========  Services  ==========*/

window.ThumborService = require '../shared/react/services/thumbor'

# /*==========  Components  ==========*/

require './react/components/auth/auth'
require './react/components/auth/authEmailSignIn'
require './react/components/auth/authEmailSignUp'

# /*==========  Pages  ==========*/

window.EntryPage       = require './react/pages/entry'
window.TlogRegularPage = require './react/pages/tlogRegular'
window.TlogDaylogPage  = require './react/pages/tlogDaylog'
window.FeedLivePage    = require './react/pages/feedLive'
window.FeedBestPage    = require './react/pages/feedBest'
window.FeedFriendsPage = require './react/pages/feedFriends'

# /*==========  Stores  ==========*/

require './react/stores/currentUser'
require './react/stores/relationships'
require './react/stores/feed'

ReactApp.start()