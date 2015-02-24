{ PropTypes } = React

CreateConversationButton = React.createClass
  displayName: 'CreateConversationButton'

  propTypes:
    onClick: PropTypes.func.isRequired

  render: ->
    <button className="messages__button"
            onClick={ @handleClick }>
      { i18n.t('buttons.messenger_create_conversation') }
    </button>

  handleClick: (e) ->
    e.preventDefault()
    @props.onClick()

module.exports = CreateConversationButton