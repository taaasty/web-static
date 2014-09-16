###* @jsx React.DOM ###

window.MessagesPopup_DialogList = React.createClass

  propTypes:
    dialogs:           React.PropTypes.array
    onClickDialog:     React.PropTypes.func.isRequired
    onCreateNewThread: React.PropTypes.func.isRequired

  componentDidMount: ->
    @$scroller = $( @refs.scroller.getDOMNode() )

    @scroller = @$scroller.baron
      scroller: ".js-scroller-pane"
      bar:      ".js-scroller-bar"
      track:    ".js-scroller-track"
      barOnCls: "scroller--tracked"
      pause:    0

  componentDidUpdate: ->
    @scroller.update()
    @$scroller.trigger("sizeChange").trigger('sizeChange')

  componentWillUnmount: ->
    @scroller.dispose()
    @$scroller = @scroller = null

  render: ->
    that = @
    dialogListItems = @props.dialogs.map (dialogListItem, i) ->
      `<MessagesPopup_DialogListItem user={ dialogListItem.user }
                                     online={ dialogListItem.online }
                                     lastMessage={ dialogListItem.last_message }
                                     newMessagesCount={ dialogListItem.new_messages_count }
                                     onClick={ that.props.onClickDialog }
                                     key={ dialogListItem.id + i } />`

    return `<div className="messages__section messages__section--dialogs">
              <div className="messages__body">
                <div ref="scroller"
                     className="scroller scroller--dark">
                  <div className="scroller__pane js-scroller-pane">
                    <div className="messages__dialogs">
                      { dialogListItems }
                    </div>
                  </div>
                  <div className="scroller__track js-scroller-track">
                    <div className="scroller__bar js-scroller-bar"></div>
                  </div>
                </div>
              </div>
              <footer className="messages__footer">
                <MessagesPopup_UICreateNewThreadButton onClick={ this.props.onCreateNewThread } />
              </footer>
            </div>`