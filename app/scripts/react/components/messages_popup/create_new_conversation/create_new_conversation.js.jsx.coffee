###* @jsx React.DOM ###

PROCESS_STATE  = 'process'
CHOOSER_STATE  = 'chooser'

window.MessagesPopup_CreateNewConversation = React.createClass

  getInitialState: ->
    currentState: CHOOSER_STATE

  render: ->
    switch @state.currentState
      when PROCESS_STATE
        content = `<MessagesPopup_LoadingMessage content="Создаю беседу…" />`
      when CHOOSER_STATE
        content = `<MessagesPopup_Chooser onSubmit={ this.postNewConversation } />`

    return `<div className="messages__section messages__section--recipients">
              <div className="messages__body">
                { content }
              </div>
            </div>`

  activateProcessState: -> @setState(currentState: PROCESS_STATE)
  activateChooserState: -> @setState(currentState: CHOOSER_STATE)

  postNewConversation: (recipientSlug) ->
    @activateProcessState()

    ConversationActions.postNewConversation {
      recipientSlug: recipientSlug
      error: @activateChooserState
    }