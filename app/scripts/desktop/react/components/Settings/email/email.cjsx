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
    currentState: @getCurrentStateFromProps @props

  componentWillReceiveProps: (nextProps) ->
    @setState(currentState: @getCurrentStateFromProps nextProps)

  render: ->
    switch @state.currentState
      when SHOW_STATE
        <SettingsEmailShow
            email={ @props.email }
            confirmationEmail={ @props.confirmationEmail }
            onEditStart={ @activateEditState }
            onCancel={ @handleCancel }
            onResend={ @props.onResend } />
      when ESTABLISH_STATE
        <SettingsEmailEstablish onSubmit={ @handleSubmit } />
      when EDIT_STATE
        <SettingsEmailEdit
             email={ @props.email }
             onEditCancel={ @activateShowState }
             onSubmit={ @handleSubmit } />
      else console.warn 'Unknown currentState of SettingsEmail component', @state.currentState

  activateEditState: -> @setState(currentState: EDIT_STATE)
  activateShowState: -> @setState(currentState: SHOW_STATE)

  getCurrentStateFromProps: (props) ->
    if props.email? || props.confirmationEmail? then SHOW_STATE else ESTABLISH_STATE

  handleSubmit: (newEmail) ->
    @props.onUpdate
      email: newEmail
      success: @activateShowState

  handleCancel: ->
    @props.onCancel(success: @activateShowState)
    
module.exports = SettingsEmail