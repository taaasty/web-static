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