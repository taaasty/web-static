#TODO: i18n
TITLE = 'Написать сообщение'

window.WriteMessageButton = React.createClass

  propTypes:
    user: React.PropTypes.object.isRequired

  render: ->
    title = @_getTitle()

    return <button className="write-message-button"
                   onClick={ this.handleClick }>
             <i className="icon icon--letter"></i>
           </button>

  _getTitle: -> TITLE

  handleClick: ->
    ConversationActions.openConversation @props.user.slug