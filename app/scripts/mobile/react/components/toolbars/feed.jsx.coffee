###* @jsx React.DOM ###

FeedToolbarList = require './feed/list'
ToolbarMixin    = require './mixins/toolbar'
BrowserHelpers  = require '../../../../shared/helpers/browser'
{ PropTypes }       = React
{ PureRenderMixin } = React.addons

window.FeedToolbar = React.createClass
  mixins: [ToolbarMixin]

  propTypes:
    friendsUrl:   PropTypes.string
    liveUrl:      PropTypes.string.isRequired
    bestUrl:      PropTypes.string.isRequired
    anonymousUrl: PropTypes.string.isRequired

  render: ->
    toolbarPopupClasses = React.addons.classSet
      'toolbar__popup': true
      '__visible': @isOpenState()

    return `<nav className="toolbar toolbar--feed">
              <div className="toolbar__toggle"
                   onClick={ this.toggleOpenState }>
                <i className="icon icon--ribbon" />
              </div>
              <div className={ toolbarPopupClasses }>
                <FeedToolbarList
                    friendsUrl={ this.props.friendsUrl }
                    liveUrl={ this.props.liveUrl }
                    bestUrl={ this.props.bestUrl }
                    anonymousUrl={ this.props.anonymousUrl } />
              </div>
            </nav>`

  toggleOpenState: ->
    html = document.querySelector 'html'

    html.classList.remove 'user-toolbar-open' if html.classList.contains 'user-toolbar-open'
    html.classList.toggle 'feed-toolbar-open'

    if @isOpenState()
      #FIXME: layout transitionEnd
      setTimeout @activateCloseState, 500
    else
      @activateOpenState()