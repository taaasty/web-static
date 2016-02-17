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
require './react/mixins/positions'
require './react/mixins/shake'
require './react/mixins/grammar'
require './react/mixins/error_timer'
require './react/mixins/activities'
require './react/mixins/requester'
require './react/mixins/scroller'
#require './react/mixins/touch'

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
require './react/messaging/stores/connection_state'

# /*==========  Control structures  ==========*/

require './react/messaging/messaging_service'
require './react/messaging/messaging_requester'
require './react/messaging/messaging_testing'

# /*-----  End of Messaging resources  ------*/

require './react/components/common/adaptive_input'

global.EmbedComponent = require './react/components/embed'

# /*===============================================
# =            Authorization resources            =
# ===============================================*/

global.Auth = require './react/components/Auth'
require './react/components/Auth/authorization/authorization'
require './react/components/Auth/authorization/vk'
require './react/components/Auth/authorization/facebook'

require './react/components/Auth/buttons/vk_auth_button'
require './react/components/Auth/buttons/facebook_auth_button'

require './react/components/Auth/email/email'
require './react/components/Auth/recovery'

# /*-----  End of Authorization resources  ------*/

global.Settings = require './react/components/Settings'

global.BrowserSupportContainer = require './react/components/BrowserSupport/BrowserSupportContainer'
global.TlogAlertContainer = require './react/components/TlogAlert/TlogAlertContainer'
global.ImageAttachmentsCollage = require '../shared/react/components/common/imageAttachmentsCollage'
global.UserToolbarContainer = require './react/components/toolbars/UserToolbarContainer'
global.NotificationsContainer = require './react/components/Notifications/NotificationsContainer'
global.ComposeToolbarContainer = require './react/components/ComposeToolbar/ComposeToolbarContainer'
global.AvatarToolbarContainer = require './react/components/toolbars/AvatarToolbarContainer'

require './react/components/shellboxes/confirm_registration'

require './react/components/shellbox_layer'

require './react/components/relationship_buttons/mixins/relationship'
require './react/components/relationship_buttons/follow_button'
require './react/components/relationship_buttons/follower_button'
require './react/components/relationship_buttons/ignore_button'
require './react/components/relationship_buttons/request_button'
require './react/components/relationship_buttons/guess_button'

require './react/components/smart_follow_status'

require './react/components/editable_field'

global.Feed = require './react/components/Feed/Feed'
global.EntryTlog = require './react/components/EntryTlog'
global.EntryTlogsContainer = require './react/components/EntryTlogs/EntryTlogsContainer';
global.EntryBricksContainer = require './react/components/EntryBricks/EntryBricksContainer';
global.FlowBricksContainer = require './react/components/FlowBricks/FlowBricksContainer'
global.SearchResults = require './react/components/SearchResults/SearchResults'
global.LiveLoadButtonContainer = require('./react/components/FeedPage/LiveLoadButtonContainer')
global.BestLoadButtonContainer = require('./react/components/FeedPage/BestLoadButtonContainer')
global.FriendsLoadButtonContainer = require('./react/components/FeedPage/FriendsLoadButtonContainer')
global.FeedPageBody = require './react/components/FeedPage/FeedPageBody';

require './react/components/search/search'
require './react/components/search/button'
require './react/components/search/field'

global.DesignSettingsContainer = require './react/components/DesignSettings/DesignSettingsContainer'
global.DesignPaymentContainer = require './react/components/DesignPayment/DesignPaymentContainer'
global.DesignSettingsColorPickerPopup = require './react/components/DesignSettings/common/colorPicker/popup'

require './react/components/persons_popup/mixins/panel_mixin'
require './react/components/persons_popup/persons_popup'
require './react/components/persons_popup/menu'
require './react/components/persons_popup/menu_item'

require './react/components/persons_popup/items/item'
require './react/components/persons_popup/items/following_relationship'
require './react/components/persons_popup/items/follower_relationship'
require './react/components/persons_popup/items/requested_relationship'
require './react/components/persons_popup/items/guess_relationship'
require './react/components/persons_popup/items/ignored_relationship'

require './react/components/persons_popup/panels/followings_panel'
require './react/components/persons_popup/panels/followers_panel'
require './react/components/persons_popup/panels/guessed_panel'
require './react/components/persons_popup/panels/requested_panel'
require './react/components/persons_popup/panels/ignored_panel'
require './react/components/persons_popup/panels/socialNetwork/vkontakte'
require './react/components/persons_popup/panels/socialNetwork/facebook'

require './react/components/people/item'

global.HeroFlows = require './react/components/HeroComponent/HeroFlows'
global.HeroProfile = require './react/components/HeroProfile'
global.EditorNew = require './react/components/Editor/EditorNew'
global.EditorEdit = require './react/components/Editor/EditorEdit'
global.Spinner = require '../shared/react/components/common/Spinner'
global.ScreenViewer = require './react/components/screen_viewer/screen_viewer'
global.LandingPageBody = require './react/components/LandingPage/LandingPageBody'
global.SocialShare = require './react/components/common/SocialShare';
global.Voting = require './react/components/common/Voting';

require './react/components/alerts/tasty_confirm'
require './react/components/alerts/tasty_alert'

require './react/controllers/tasty_events'
require './react/controllers/tasty_confirm'
require './react/controllers/tasty_alert'

require './react/controllers/shellbox'
require './react/controllers/popup'

require './react/mediators/comments'

global.ReactApp = require './react/ReactApp';

global._popupActions = require './react/actions/popup';
