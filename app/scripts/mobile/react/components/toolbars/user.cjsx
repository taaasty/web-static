classnames = require 'classnames'
UserToolbarToggle         = require './user/toggle'
UserToolbarList           = require './user/list'
UserToolbarListAdditional = require './user/listAdditional'
ToolbarMixin              = require './mixins/toolbar'
{ PropTypes } = React

UserToolbar = React.createClass
  displayName: 'UserToolbar'
  mixins: [ToolbarMixin]

  propTypes:
    user:                     PropTypes.object
    unreadConversationsCount: PropTypes.number.isRequired
    unreadNotificationsCount: PropTypes.number.isRequired

  render: ->
    toolbarClasses = classnames('toolbar__popup', 'toolbar__popup--complex', {
      '__visible': @isOpenState()
    })

    return <nav className="toolbar toolbar--user">
             <UserToolbarToggle
                 hasConversations={ !!@props.unreadConversationsCount }
                 hasNotifications={ !!@props.unreadNotificationsCount }
                 onClick={ @toggleOpenState } />
             <div className={ toolbarClasses }>
               <UserToolbarList
                   user={ @props.user }
                   unreadConversationsCount={ @props.unreadConversationsCount }
                   unreadNotificationsCount={ @props.unreadNotificationsCount } />
               <UserToolbarListAdditional />
             </div>
           </nav>

  toggleOpenState: ->
    html = document.querySelector 'html'

    html.classList.remove 'feed-toolbar-open' if html.classList.contains 'feed-toolbar-open'
    html.classList.toggle 'user-toolbar-open'

    if @isOpenState() then @activateCloseState() else @activateOpenState()

module.exports = UserToolbar