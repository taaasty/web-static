###* @jsx React.DOM ###

UserToolbarList = require './user/list'
ToolbarMixin    = require './mixins/toolbar'
{ PropTypes } = React

window.UserToolbar = React.createClass
  mixins: [ToolbarMixin]

  propTypes:
    userSlug: PropTypes.string

  render: ->
    if @isOpenState()
      list = `<div className="toolbar__popup __visible">
                <UserToolbarList userSlug={ this.props.userSlug } />
              </div>`

    return `<nav className="toolbar toolbar--right toolbar--user">
              <div className="toolbar__toggle"
                   onClick={ this.toggleOpenState }>
                <i className="icon icon--menu" />
              </div>
              { list }
            </nav>`

  toggleOpenState: ->
    html = document.querySelector 'html'

    clearTimeout @timeout if @timeout?

    html.classList.remove 'feed-toolbar-open' if html.classList.contains 'feed-toolbar-open'
    html.classList.toggle 'user-toolbar-open'

    if @isOpenState()
      #FIXME: layout transitionEnd
      @timeout = setTimeout @activateCloseState, 500
    else
      @activateOpenState()