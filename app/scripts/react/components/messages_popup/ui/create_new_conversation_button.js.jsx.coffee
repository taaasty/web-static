###* @jsx React.DOM ###

BUTTON_TEXT = 'Cоздать переписку'

window.MessagesPopup_UICreateNewConversationButton = React.createClass

  propTypes:
    onClick: React.PropTypes.func.isRequired

  render: ->
   `<span className="button button--green"
          onClick={ this.props.onClick }>
      <span className="button__inner">
        <span className="button__text">{ BUTTON_TEXT }</span>
      </span>
    </span>`