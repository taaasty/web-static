window.MessagesPopup_ChooserButton = React.createClass

  propTypes:
    onClick: React.PropTypes.func.isRequired

  render: ->
    <div className="messages__chooser-button"
         onClick={ this.props.onClick }>
      <span className="messages__chooser-button-text">
        { i18n.t('new_thread_placeholder') }
      </span>
    </div>