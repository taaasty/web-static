cx               = require 'react/lib/cx'
UserToolbarList  = require './user/list'
ToolbarMixin     = require './mixins/toolbar'
UserToolbarMixin = require './user/mixins/user'
PureRenderMixin  = require 'react/lib/ReactComponentWithPureRenderMixin'
{ PropTypes } = React

window.UserToolbar = React.createClass
  mixins: [
    ToolbarMixin, UserToolbarMixin, ComponentManipulationsMixin, ScrollerMixin
    PureRenderMixin
  ]

  propTypes:
    myTlogUrl:            PropTypes.string.isRequired
    newEntryUrl:          PropTypes.string
    newAnonymousEntryUrl: PropTypes.string
    favoritesUrl:         PropTypes.string
    privateEntriesUrl:    PropTypes.string
    logoutUrl:            PropTypes.string

  render: ->
    toolbarClasses = cx
      'toolbar':        true
      'toolbar--right': true
      'toolbar--user':  true
      'state--open':    !@isClosedState()

    return <nav className={ toolbarClasses }
                onClick={ this.handleClick }
                onMouseEnter={ this.handleMouseEnter }
                onMouseLeave={ this.handleMouseLeave }>
             <div className="toolbar__toggle">
               <i className="icon icon--menu" />
             </div>
             <div className="toolbar__popup">
               <div ref="scroller"
                    className="scroller scroller--dark scroller--toolbar">
                 <div className="scroller__pane js-scroller-pane">
                   <UserToolbarList
                       newEntryUrl={ this.props.newEntryUrl }
                       newAnonymousEntryUrl={ this.props.newAnonymousEntryUrl }
                       myTlogUrl={ this.props.myTlogUrl }
                       favoritesUrl={ this.props.favoritesUrl }
                       privateEntriesUrl={ this.props.privateEntriesUrl }
                       logoutUrl={ this.props.logoutUrl } />
                 </div>
                 <div className="scroller__track js-scroller-track">
                   <div className="scroller__bar js-scroller-bar" />
                 </div>
               </div>
             </div>
           </nav>