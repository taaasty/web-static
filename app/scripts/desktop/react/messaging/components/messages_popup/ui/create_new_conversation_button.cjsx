window.MessagesPopup_UICreateNewConversationButton = React.createClass

  propTypes:
    onClick: React.PropTypes.func.isRequired

  render: ->
    <span className="button button--green"
          onClick={ this.props.onClick }>
      <span className="button__inner">
        <span className="button__text">
          { i18n.t('new_thread_button') } 
        </span>
      </span>
    </span>