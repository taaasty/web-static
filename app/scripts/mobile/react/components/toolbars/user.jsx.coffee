###* @jsx React.DOM ###

UserToolbarList = require './user/list'
ToolbarMixin    = require './mixins/toolbar'
{ PropTypes }       = React
{ PureRenderMixin } = React.addons

window.UserToolbar = React.createClass
  mixins: [ToolbarMixin]

  propTypes:
    myTlogUrl:            PropTypes.string.isRequired
    newEntryUrl:          PropTypes.string
    newAnonymousEntryUrl: PropTypes.string
    favoritesUrl:         PropTypes.string
    privateEntriesUrl:    PropTypes.string
    logoutUrl:            PropTypes.string

  render: ->
    toolbarPopupClasses = React.addons.classSet
      'toolbar__popup': true
      '__visible':      @isOpenState()

    return `<nav className="toolbar toolbar--right toolbar--user">
              <div className="toolbar__toggle"
                   onClick={ this.toggleOpenState }>
                <i className="icon icon--menu" />
              </div>
              <div className={ toolbarPopupClasses }>
                <UserToolbarList
                    newEntryUrl={ this.props.newEntryUrl }
                    newAnonymousEntryUrl={ this.props.newAnonymousEntryUrl }
                    myTlogUrl={ this.props.myTlogUrl }
                    favoritesUrl={ this.props.favoritesUrl }
                    privateEntriesUrl={ this.props.privateEntriesUrl }
                    logoutUrl={ this.props.logoutUrl } />
              </div>
            </nav>`

  toggleOpenState: ->
    html = document.querySelector 'html'

    html.classList.remove 'feed-toolbar-open' if html.classList.contains 'feed-toolbar-open'
    html.classList.toggle 'user-toolbar-open'

    if @isOpenState()
      #FIXME: layout transitionEnd
      setTimeout @activateCloseState, 500
    else
      @activateOpenState()