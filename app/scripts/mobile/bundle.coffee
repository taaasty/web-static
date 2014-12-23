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

# /*==========  Stores  ==========*/

require './react/stores/current_user'
require './react/stores/relationships'

ReactApp.start()