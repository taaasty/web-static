###* @jsx React.DOM ###

window.MessagesPopup_ThreadMessageForm = React.createClass

  propTypes:
    conversationId: React.PropTypes.number.isRequired

  getInitialState: -> @getStateFromStores()

  render: ->
   `<div className="message-form">
      <span className="messages__user-avatar">
        <UserAvatar user={ this.state.user } size={ 35 } />
      </span>
      <textarea onKeyDown={ this.handleKeyDown }
                placeholder="Ваше сообщение…"
                className="message-form__textarea" />
    </div>`

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