###* @jsx React.DOM ###

window.MessagesPopup_ThreadMessageForm = React.createClass

  propTypes:
    conversationId: React.PropTypes.number.isRequired

  getInitialState: ->
    state = _.extend {}, @getStateFromStores(), {
      isLoading: false
    }

  render: ->
    if @state.isLoading
      avatar = `<span className="spinner spinner--31x31"><span className="spinner__icon"></span></span>`
    else
      avatar = `<UserAvatar user={ this.state.user } size={ 35 } />`

    return `<div className="message-form">
              <span className="messages__user-avatar">
                { avatar }
              </span>
              <textarea ref="messageForm"
                        onKeyDown={ this.handleKeyDown }
                        placeholder="Ваше сообщение…"
                        className="message-form__textarea" />
            </div>`

  clearForm: ->
    @refs.messageForm.getDOMNode().value = ''

  getStateFromStores: ->
    user: CurrentUserStore.getUser()

  handleKeyDown: (e) ->
    switch e.key
      when 'Enter'
        e.preventDefault()

        MessageActions.newMessage {
          content: e.target.value
          conversationId: @props.conversationId
        }

        @clearForm()