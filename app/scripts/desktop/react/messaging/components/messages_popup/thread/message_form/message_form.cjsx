window.MessagesPopup_ThreadMessageForm = React.createClass

  propTypes:
    conversationId: React.PropTypes.number.isRequired

  getInitialState: ->
    state = _.extend {}, @getStateFromStores(), {
      isLoading: false
    }

  componentDidMount: ->
    @refs.messageForm.getDOMNode().focus()

  render: ->
    if @state.isLoading
      avatar = <span className="spinner spinner--31x31"><span className="spinner__icon"></span></span>
    else
      avatar = <UserAvatar user={ this.state.user } size={ 35 } />

    return <div className="message-form">
             <span className="messages__user-avatar">
               { avatar }
             </span>
             <textarea ref="messageForm"
                       onKeyDown={ this.handleKeyDown }
                       placeholder="Ваше сообщение…"
                       className="message-form__textarea" />
           </div>

  isFormEmpty: ->
    @refs.messageForm.getDOMNode().value == ''

  clearForm: ->
    @refs.messageForm.getDOMNode().value = ''

  getStateFromStores: ->
    user: CurrentUserStore.getUser()

  handleKeyDown: (e) ->
    # Нажат Enter, введёный текст содержит какие-то символы, без Shift, Ctrl, Alt, Cmd
    if e.key is 'Enter' && !@isFormEmpty() &&
       !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey

      e.preventDefault()

      MessageActions.newMessage {
          content: e.target.value
          conversationId: @props.conversationId
        }

      @clearForm()