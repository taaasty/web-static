window.WriteMessageButton = React.createClass

  propTypes:
    user: React.PropTypes.object.isRequired

  render: ->
    <button className="write-message-button"
            onClick={ @handleClick }>
      <i className="icon icon--letter" />
    </button>

  handleClick: ->
    ConversationActions.openConversation @props.user.id