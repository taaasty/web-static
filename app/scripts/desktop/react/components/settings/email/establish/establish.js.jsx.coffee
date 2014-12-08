###* @jsx React.DOM ###

SettingsEmailEstablishShow = require './show'
SettingsEmailEstablishEdit = require './edit'

SHOW_STATE = 'show'
EDIT_STATE = 'edit'

SettingsEmailEstablish = React.createClass

  propTypes:
    onSubmit: React.PropTypes.func.isRequired

  getInitialState: ->
    currentState: SHOW_STATE

  render: ->
    switch @state.currentState
      when SHOW_STATE
        `<SettingsEmailEstablishShow onEditStart={ this.activateEditState } />`
      when EDIT_STATE
        `<SettingsEmailEstablishEdit
             onSubmit={ this.props.onSubmit }
             onEditCancel={ this.activateShowState } />`
      else console.warn 'Unknown currentState of SettingsEmailEstablish component', @state.currentState

  activateShowState: -> @setState(currentState: SHOW_STATE)
  activateEditState: -> @setState(currentState: EDIT_STATE)

module.exports = SettingsEmailEstablish