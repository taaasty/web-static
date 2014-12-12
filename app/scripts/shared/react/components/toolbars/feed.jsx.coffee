###* @jsx React.DOM ###

FeedToolbarList = require './feed/list'
ToolbarMixin    = require './mixins/toolbar'
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
    toolbarClasses = React.addons.classSet {
      'toolbar':      true
      'toolbar--nav': true
      'state--open':  !@isClosedState()
    }

    return `<nav className={ toolbarClasses }
                 onClick={ this.handleClick }
                 onMouseEnter={ this.handleMouseEnter }
                 onMouseLeave={ this.handleMouseLeave }>
              <div className="toolbar__toggle">
                <i className="icon icon--ribbon" />
              </div>
              <div className="toolbar__popup" data-element="dropdown-menu">
                <div ref="scroller"
                     className="scroller scroller--dark scroller--toolbar">
                  <div className="scroller__pane js-scroller-pane">
                    <FeedToolbarList
                        friendsUrl={ this.props.friendsUrl }
                        liveUrl={ this.props.liveUrl }
                        bestUrl={ this.props.bestUrl }
                        anonymousUrl={ this.props.anonymousUrl } />
                  </div>
                  <div className="scroller__track js-scroller-track">
                    <div className="scroller__bar js-scroller-bar" />
                  </div>
                </div>
              </div>
            </nav>`