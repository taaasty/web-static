FeedToolbarList = require './feed/list'
ToolbarMixin    = require './mixins/toolbar'
{ PropTypes } = React

module.exports = React.createClass
  displayName: 'FeedToolbar'
  mixins: [ToolbarMixin]

  propTypes:
    userSlug: PropTypes.string

  render: ->
    if @isOpenState()
      list = <div className="toolbar__popup __visible">
               <FeedToolbarList userSlug={ this.props.userSlug } />
             </div>

    return <nav className="toolbar toolbar--feed">
             <div className="toolbar__toggle"
                  onClick={ this.toggleOpenState }>
               <i className="icon icon--ribbon" />
             </div>
             { list }
           </nav>

  toggleOpenState: ->
    html = document.querySelector 'html'

    html.classList.remove 'user-toolbar-open' if html.classList.contains 'user-toolbar-open'
    html.classList.toggle 'feed-toolbar-open'

    if @isOpenState() then @activateCloseState() else @activateOpenState()