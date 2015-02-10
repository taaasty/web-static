SettingsEmailMixin       = require './mixins/email'
SettingsEmailShow        = require './email/show'
SettingsEmailDeclare     = require './email/declare'
SettingsEmailUnconfirmed = require './email/unconfirmed'
{ PropTypes } = React

SHOW_STATE        = 'show'
DECLARE_STATE     = 'declare'
UNCONFIRMED_STATE = 'unconfirmed'

SettingsEmail = React.createClass
  displayName: 'SettingsEmail'
  mixins: [SettingsEmailMixin]

  propTypes:
    email:             PropTypes.string.isRequired
    confirmationEmail: PropTypes.oneOfType [PropTypes.string, PropTypes.object]

  getInitialState: ->
    currentState: @getCurrentStateFromProps @props

  componentWillReceiveProps: (nextProps) ->
    @setState(currentState: @getCurrentStateFromProps nextProps)

  render: ->
    switch @state.currentState
      when SHOW_STATE
        <SettingsEmailShow
            email={ @props.email }
            onChange={ @updateEmail } />
      when DECLARE_STATE
        <SettingsEmailDeclare onDeclare={ @updateEmail } />
      when UNCONFIRMED_STATE
        <SettingsEmailUnconfirmed
            confirmationEmail={ @props.confirmationEmail }
            onCancel={ @cancelEmailConfirmation } />
      else console.warn 'Unknown currentState of SettingsEmail component', @state.currentState

  activateUnconfirmedState: -> @setState(currentState: UNCONFIRMED_STATE)

  getCurrentStateFromProps: (props) ->
    switch
      when props.confirmationEmail? then UNCONFIRMED_STATE
      when props.email?             then SHOW_STATE
      else DECLARE_STATE

module.exports = SettingsEmail



# SettingsEmailShow      = require './show'
# SettingsEmailEdit      = require './edit'
# SettingsEmailEstablish = require './establish/establish'

# SHOW_STATE      = 'show'
# EDIT_STATE      = 'edit'
# ESTABLISH_STATE = 'establish'

# SettingsEmail = React.createClass

#   propTypes:
#     email:             React.PropTypes.any.isRequired
#     confirmationEmail: React.PropTypes.any
#     onUpdate:          React.PropTypes.func.isRequired
#     onCancel:          React.PropTypes.func.isRequired
#     onResend:          React.PropTypes.func.isRequired

#   getInitialState: ->
#     currentState: @getCurrentStateFromProps @props

#   componentWillReceiveProps: (nextProps) ->
#     @setState(currentState: @getCurrentStateFromProps nextProps)

#   render: ->
#     switch @state.currentState
#       when SHOW_STATE
#         <SettingsEmailShow
#             email={ @props.email }
#             confirmationEmail={ @props.confirmationEmail }
#             onEditStart={ @activateEditState }
#             onCancel={ @handleCancel }
#             onResend={ @props.onResend } />
#       when ESTABLISH_STATE
#         <SettingsEmailEstablish onSubmit={ @handleSubmit } />
#       when EDIT_STATE
#         <SettingsEmailEdit
#              email={ @props.email }
#              onEditCancel={ @activateShowState }
#              onSubmit={ @handleSubmit } />
#       else console.warn 'Unknown currentState of SettingsEmail component', @state.currentState

#   activateEditState: -> @setState(currentState: EDIT_STATE)
#   activateShowState: -> @setState(currentState: SHOW_STATE)

#   getCurrentStateFromProps: (props) ->
#     if props.email? || props.confirmationEmail? then SHOW_STATE else ESTABLISH_STATE

#   handleSubmit: (newEmail) ->
#     @props.onUpdate
#       email: newEmail
#       success: @activateShowState

#   handleCancel: ->
#     @props.onCancel(success: @activateShowState)
    
# module.exports = SettingsEmail