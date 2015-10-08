window.MessagesPopup_LoadingMessage = React.createClass

  propTypes:
    content: React.PropTypes.string.isRequired

  render: ->
    <div className="grid-full">
      <div className="grid-full__middle">
        <div className="messages-loading">
          <div className="messages-loading__header">
            <Spinner size={ 30 } />
          </div>
          <div className="messages-loading__body">
            { this.props.content }
          </div>
        </div>
      </div>
    </div>