# /*==========  Shims  ==========*/
require '../shared/shims/console'

require './resources/Libs'
require './resources/is_mobile'
require './resources/fileReceiver'
require './resources/tasty'
require './resources/tasty_utils'
window.Routes    = require '../shared/routes/routes'
window.ApiRoutes = require '../shared/routes/api'

# /*==========  Locales  ==========*/
require './locales/numeral/ru'
require './locales/moment/ru'
require './locales/moment/en'

require './react/services/positions'
global.NoticeService = require './react/services/Notice'
global.BeepService = require '../shared/react/services/Beep'
global.ThumborService = require '../shared/react/services/thumbor'
require './react/services/uuid'

# /*===============================
# =            Helpers            =
# ===============================*/

require './react/helpers/app'

# /*-----  End of Helpers  ------*/

# /*==============================
# =            Mixins            =
# ==============================*/

require './react/mixins/unmount'
require './react/mixins/dom_manipulations'
require './react/mixins/component_manipulations'
require './react/mixins/shake'
require './react/mixins/error_timer'
require './react/mixins/requester'
require './react/mixins/scroller'

# /*-----  End of Mixins  ------*/

require './react/dispatchers/current_user'
require './react/dispatchers/relationships'
global.CurrentUserStore = require './react/stores/current_user'
DesignStore = require './react/stores/design'
require './react/stores/EditorStore'
require './react/stores/relationships'

require './react/components/transition/timeout_transition_group'

# /*============================================
# =            Messaging resourses            =
# ============================================*/

# /*==========  Stores  ==========*/

global.MessagingStatusStore = require './react/messaging/stores/messaging_status'

# /*==========  Control structures  ==========*/

require './react/messaging/messaging_testing'

# /*-----  End of Messaging resources  ------*/

require './react/components/common/adaptive_input'

global.EmbedComponent = require './react/components/embed'

# /*===============================================
# =            Authorization resources            =
# ===============================================*/

global.Auth = require './react/components/Auth'

# /*-----  End of Authorization resources  ------*/

global.BrowserSupportContainer = require './react/components/BrowserSupport'
global.TlogAlertContainer = require './react/components/TlogAlert/TlogAlertContainer'
global.ImageAttachmentsCollage = require '../shared/react/components/common/imageAttachmentsCollage'
global.UserToolbarContainer = require './react/components/UserToolbar'
global.AvatarToolbarContainer = require './react/components/toolbars/AvatarToolbarContainer'
global.ConfirmRegistrationShellbox = require './react/components/ConfirmRegistrationShellbox';

global.EntryTlog = require './react/components/EntryTlog'
global.SearchResults = require './react/components/SearchResults/SearchResults'

require './react/components/search/search'
require './react/components/search/button'
require './react/components/search/field'

global.DesignSettingsContainer = require './react/components/DesignSettings/DesignSettingsContainer'
global.DesignPaymentContainer = require './react/components/DesignPayment/DesignPaymentContainer'
global.DesignSettingsColorPickerPopup = require './react/components/DesignSettings/common/colorPicker/popup'
global.HeroProfile = require './react/components/HeroProfile'
global.EditorNew = require './react/components/Editor/EditorNew'
global.EditorEdit = require './react/components/Editor/EditorEdit'
global.Spinner = require '../shared/react/components/common/Spinner'
global.SocialShare = require './react/components/common/SocialShare';

require './react/components/alerts/tasty_confirm'
require './react/components/alerts/tasty_alert'

require './react/controllers/tasty_events'
require './react/controllers/tasty_alert'

require './react/controllers/popup'

require './react/mediators/comments'

global.ReactApp = require './react/ReactApp';

global._popupActions = require './react/actions/PopupActions';
