###* @jsx React.DOM ###

SettingsEmailShow      = require './show'
SettingsEmailEdit      = require './edit'
SettingsEmailEstablish = require './establish/establish'

SHOW_STATE      = 'show'
EDIT_STATE      = 'edit'
ESTABLISH_STATE = 'establish'

SettingsEmail = React.createClass
  mixins: [RequesterMixin]

  propTypes:
    email:             React.PropTypes.any.isRequired
    confirmationEmail: React.PropTypes.any
    confirmed:         React.PropTypes.bool.isRequired
    onUpdate:          React.PropTypes.func.isRequired

  getInitialState: ->
    currentState: if @props.email then SHOW_STATE else ESTABLISH_STATE

  render: ->
    switch @state.currentState
      when SHOW_STATE
        settingsEmail = `<SettingsEmailShow email={ this.props.email }
                                            confirmationEmail={ this.props.confirmationEmail }
                                            confirmed={ this.props.confirmed }
                                            onClickEdit={ this.activateEditState }
                                            onClickCancel={ this.makeCancelRequest } />`
      when ESTABLISH_STATE
        settingsEmail = `<SettingsEmailEstablish onSubmitEstablish={ this.onSubmit } />`
      when EDIT_STATE
        settingsEmail = `<SettingsEmailEdit email={ this.props.email }
                                            onCancelEdit={ this.activateShowState }
                                            onSubmitEdit={ this.onSubmit }
                                            onBlurEdit={ this.activateShowState } />`

  activateEditState: -> @setState(currentState: EDIT_STATE)
  activateShowState: -> @setState(currentState: SHOW_STATE)

  isEditing:      -> @state.currentState is EDIT_STATE
  isShowing:      -> @state.currentState is SHOW_STATE
  isEstablishing: -> @state.currentState is ESTABLISH_STATE

  onSubmit: (newEmail) ->
    @props.onUpdate 'email', newEmail
    @activateShowState()

  makeCancelRequest: ->
    @createRequest
      url:  ApiRoutes.request_confirm_url()
      method: 'DELETE'
      success: =>
        @props.onUpdate 'confirmation_email', null
      error: (data) =>
        TastyNotifyController.errorResponse data

module.exports = SettingsEmail