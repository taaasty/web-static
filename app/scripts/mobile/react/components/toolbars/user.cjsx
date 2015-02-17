cx                        = require 'react/lib/cx'
UserToolbarList           = require './user/list'
UserToolbarListAdditional = require './user/listAdditional'
ToolbarMixin              = require './mixins/toolbar'
{ PropTypes } = React

UserToolbar = React.createClass
  displayName: 'UserToolbar'
  mixins: [ToolbarMixin]

  propTypes:
    user: PropTypes.object

  render: ->
    toolbarClasses = cx
      'toolbar__popup': true
      'toolbar__popup--complex': true
      '__visible': @isOpenState()

    return <nav className="toolbar toolbar--user">
             <div className="toolbar__toggle"
                  onClick={ @toggleOpenState }>
               <i className="icon icon--menu" />
             </div>
             <div className={ toolbarClasses }>
               <UserToolbarList user={ @props.user } />
               <UserToolbarListAdditional />
             </div>
           </nav>

  toggleOpenState: ->
    html = document.querySelector 'html'

    html.classList.remove 'feed-toolbar-open' if html.classList.contains 'feed-toolbar-open'
    html.classList.toggle 'user-toolbar-open'

    if @isOpenState() then @activateCloseState() else @activateOpenState()

module.exports = UserToolbar