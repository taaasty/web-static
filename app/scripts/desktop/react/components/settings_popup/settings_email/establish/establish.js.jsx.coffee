###* @jsx React.DOM ###

SHOW_STATE = 'show'
EDIT_STATE = 'edit'

window.SettingsEmailEstablish = React.createClass

  propTypes:
    onSubmitEstablish: React.PropTypes.func.isRequired

  getInitialState: ->
    currentState: SHOW_STATE

  render: ->
    if @isShowing()
      `<SettingsEmailEstablishShow onClickEstablish={ this.enableEditMode } />`
    else
      `<SettingsEmailEstablishEdit onSubmitEstablish={ this.props.onSubmitEstablish }
                                   onCancelEstablish={ this.enableShowMode } />`

  enableEditMode: -> @setState currentState: EDIT_STATE
  enableShowMode: -> @setState currentState: SHOW_STATE

  isEditing: -> @state.currentState is EDIT_STATE
  isShowing: -> @state.currentState is SHOW_STATE