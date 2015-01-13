require './resources/libs'
require './locales/locales'
window.Routes    = require '../shared/routes/routes'
window.ApiRoutes = require '../shared/routes/api'
require './react/application'

# /*==========  Services  ==========*/

window.ThumborService = require '../shared/react/services/thumbor'

# /*==========  Components  ==========*/

require './react/components/toolbars/user'
require './react/components/toolbars/feed'

# /*==========  Pages  ==========*/

window.EntryPage = require './react/pages/entry'
window.TlogPage  = require './react/pages/tlog'

# /*==========  Stores  ==========*/

require './react/stores/currentUser'
require './react/stores/relationships'
require './react/stores/comments'

ReactApp.start()