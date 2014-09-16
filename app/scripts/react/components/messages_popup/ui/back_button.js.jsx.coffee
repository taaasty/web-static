###* @jsx React.DOM ###

window.MessagesPopup_UIBackButton = React.createClass

  propTypes:
    onClick: React.PropTypes.func.isRequired

  render: ->
   `<div onClick={ this.props.onClick }
         className="messages__back js-messages-back">
      <div className="icon icon--arrow-left" />
    </div>`