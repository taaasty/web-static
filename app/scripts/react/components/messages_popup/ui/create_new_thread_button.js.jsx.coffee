###* @jsx React.DOM ###

BUTTON_TEXT = 'Cоздать переписку'

window.MessagesPopup_UICreateNewThreadButton = React.createClass

  propTypes:
    onClick: React.PropTypes.func.isRequired

  render: ->
   `<span className="button button--green js-messages-add"
          onClick={ this.props.onClick }>
      <span className="button__inner">
        <span className="button__text">{ BUTTON_TEXT }</span>
      </span>
    </span>`