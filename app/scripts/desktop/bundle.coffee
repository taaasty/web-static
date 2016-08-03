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
global.CurrentUserStore = require './react/stores/current_user'

# /*============================================
# =            Messaging resourses            =
# ============================================*/

# /*==========  Control structures  ==========*/

require './react/messaging/messaging_testing'

# /*-----  End of Messaging resources  ------*/

require './react/components/common/adaptive_input'

# /*===============================================
# =            Authorization resources            =
# ===============================================*/

global.Auth = require './react/components/Auth'

# /*-----  End of Authorization resources  ------*/

global.BrowserSupportContainer = require './react/components/BrowserSupport'
global.ImageAttachmentsCollage = require '../shared/react/components/common/imageAttachmentsCollage'
global.UserToolbarContainer = require './react/components/UserToolbar'
global.ConfirmRegistrationShellbox = require './react/components/ConfirmRegistrationShellbox';

global.DesignSettingsColorPickerPopup = require './react/components/DesignSettingsPopup/common/colorPicker/popup'
global.HeroProfile = require './react/components/HeroProfile'
global.Spinner = require '../shared/react/components/common/Spinner'
global.SocialShare = require './react/components/common/SocialShare';

require './react/components/alerts/tasty_confirm'

require './react/controllers/tasty_events'

global.AppRoot = require './react/AppRoot';
global.ReactApp = require './react/ReactApp';
