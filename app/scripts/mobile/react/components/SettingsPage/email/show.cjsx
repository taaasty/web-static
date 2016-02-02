NotifyController          = require '../../../controllers/notify'
SettingsEmailField        = require './fields/email'
SettingsEmailChangeButton = require './buttons/change'
{ PropTypes } = React

SettingsEmailShow = React.createClass
  displayName: 'SettingsEmailShow'

  propTypes:
    email:    PropTypes.string.isRequired
    onChange: PropTypes.func.isRequired

  render: ->
    <div className="settings__item">
      <div className="settings__left">
        <h3 className="settings__title">
          { i18n.t('settings.email_show_header') }
        </h3>
        <SettingsEmailField
            ref="emailField"
            value={ @props.email } />
        <div className="settings__actions">
          <SettingsEmailChangeButton onClick={ @handleClick } />
        </div>
      </div>
    </div>

  isValid: ->
    email = @refs.emailField.getValue()

    switch
      when email.length == 0
        NotifyController.notifyError i18n.t('messages.settings_empty_email_error')
        false
      when email == @props.email
        NotifyController.notifyError i18n.t('messages.settings_not_unique_email_error')
        false
      else true

  handleClick: ->
    email = @refs.emailField.getValue()

    @props.onChange(email) if @isValid()

module.exports = SettingsEmailShow