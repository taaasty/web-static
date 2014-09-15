###* @jsx React.DOM ###

window.MessagesPopup_DialogList = React.createClass

  propTypes:
    dialogs: React.PropTypes.array

  render: ->
    dialogListItems = @props.dialogs.map (dialogListItem) ->
      `<MessagesPopup_DialogListItem user={ dialogListItem.user }
                                     lastMessage={ dialogListItem.last_message }
                                     newMessagesCount={ dialogListItem.new_messages_count }
                                     key={ dialogListItem.id } />`

    return `<div data-section="dialogs"
                 data-title="Мои переписки"
                 className="messages__section messages__section--dialogs js-messages-section">
              <div className="messages__body">
                <div className="scroller scroller--dark js-scroller">
                  <div className="scroller__pane js-scroller-pane">
                    <div className="messages__dialogs js-messages-dialogs">
                      { dialogListItems }
                    </div>
                  </div>
                  <div className="scroller__track js-scroller-track">
                    <div className="scroller__bar js-scroller-bar"></div>
                  </div>
                </div>
              </div>
              <footer className="messages__footer">
                <span className="button button--green button--100p js-messages-add">
                  <span className="button__inner">
                    <span className="button__text">Cоздать переписку</span>
                  </span>
                </span>
              </footer>
            </div>`