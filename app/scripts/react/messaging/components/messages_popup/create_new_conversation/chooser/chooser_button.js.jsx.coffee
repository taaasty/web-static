###* @jsx React.DOM ###

BUTTON_TEXT = 'Введите имя'

window.MessagesPopup_ChooserButton = React.createClass

  propTypes:
    onClick: React.PropTypes.func.isRequired

  render: ->
   `<div className="messages__chooser-button"
         onClick={ this.props.onClick }>
      <span className="messages__chooser-button-text">{ BUTTON_TEXT }</span>
    </div>`