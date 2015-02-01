cx = require 'react/lib/cx'

OPEN_STATE  = 'openState'
CLOSE_STATE = 'closeState'

window.MessagesPopup_Chooser = React.createClass

  propTypes:
    onSubmit: React.PropTypes.func.isRequired

  getInitialState: ->
    currentState: OPEN_STATE

  render: ->
    chooserClasses = cx
      'messages__chooser': true
      'state--open': @isOpenState()

    switch @state.currentState
      when CLOSE_STATE
        chooser = <MessagesPopup_ChooserButton onClick={ this.activateOpenState } />
      when OPEN_STATE
        chooser = <MessagesPopup_ChooserDropdown onCancel={ this.activateCloseState }
                                                 onSubmit={ this.props.onSubmit } />

    return <div className="messages__box">
             <div className={ chooserClasses }>
               { chooser }
             </div>
             <div className="messages__field">
               <input type="hidden"
                      data-placeholder="Введите имя"
                      style={{ 'width': '100%' }} />
              </div>
              <div className="messages__hint">
                { i18n.t('new_thread_hint') }
              </div>
            </div>

  activateOpenState:  -> @setState(currentState: OPEN_STATE)
  activateCloseState: -> @setState(currentState: CLOSE_STATE)

  isOpenState:  -> @state.currentState is OPEN_STATE
  isCloseState: -> @state.currentState is CLOSE_STATE