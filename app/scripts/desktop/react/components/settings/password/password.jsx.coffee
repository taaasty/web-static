###* @jsx React.DOM ###

SettingsPasswordShow = require './show'
SettingsPasswordEdit = require './edit'

SHOW_STATE = 'show'
EDIT_STATE = 'edit'

SettingsPassword = React.createClass

  propTypes:
    onUpdate: React.PropTypes.func.isRequired

  getInitialState: ->
    currentState: SHOW_STATE

  render: ->
    switch @state.currentState
      when SHOW_STATE
        `<SettingsPasswordShow onEditStart={ this.activateEditState } />`
      when EDIT_STATE
        `<SettingsPasswordEdit
            onSubmit={ this.handleSubmit }
            onEditCancel={ this.activateShowState } />`
      else console.warn 'Unknown currentState of SettingsPassword component', @state.currentState

  activateShowState: -> @setState(currentState: SHOW_STATE)
  activateEditState: -> @setState(currentState: EDIT_STATE)

  handleSubmit: (newPassword) ->
    @props.onUpdate {
      password: newPassword
      success: @activateShowState
    }

module.exports = SettingsPassword