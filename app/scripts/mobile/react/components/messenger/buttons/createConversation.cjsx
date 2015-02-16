{ PropTypes } = React

MessengerCreateConversationButton = React.createClass
  displayName: 'MessengerCreateConversationButton'

  propTypes:
    onClick: PropTypes.func.isRequired

  render: ->
    <button className="messages__button"
            onClick={ @handleClick }>
      Cоздать переписку
    </button>

  handleClick: (e) ->
    e.preventDefault()
    @props.onClick()

module.exports = MessengerCreateConversationButton