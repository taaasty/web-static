###* @jsx React.DOM ###

SettingsEmailShow      = require './show'
SettingsEmailEdit      = require './edit'
SettingsEmailEstablish = require './establish/establish'

SHOW_STATE      = 'show'
EDIT_STATE      = 'edit'
ESTABLISH_STATE = 'establish'

SettingsEmail = React.createClass

  propTypes:
    email:             React.PropTypes.any.isRequired
    confirmationEmail: React.PropTypes.any
    onUpdate:          React.PropTypes.func.isRequired
    onCancel:          React.PropTypes.func.isRequired
    onResend:          React.PropTypes.func.isRequired

  getInitialState: ->
    currentState: if @props.email then SHOW_STATE else ESTABLISH_STATE

  render: ->
    switch @state.currentState
      when SHOW_STATE
        `<SettingsEmailShow
             email={ this.props.email }
             confirmationEmail={ this.props.confirmationEmail }
             onEditStart={ this.activateEditState }
             onCancel={ this.handleCancel }
             onResend={ this.props.onResend } />`
      when ESTABLISH_STATE
        `<SettingsEmailEstablish onSubmit={ this.handleSubmit } />`
      when EDIT_STATE
        `<SettingsEmailEdit
             email={ this.props.email }
             onEditCancel={ this.activateShowState }
             onSubmit={ this.handleSubmit } />`
      else console.warn 'Unknown currentState of SettingsEmail component', @state.currentState

  activateEditState: -> @setState(currentState: EDIT_STATE)
  activateShowState: -> @setState(currentState: SHOW_STATE)

  handleSubmit: (newEmail) ->
    @props.onUpdate {
      email: newEmail
      success: @activateShowState
    }

  handleCancel: ->
    @props.onCancel(success: @activateShowState)
    
module.exports = SettingsEmail