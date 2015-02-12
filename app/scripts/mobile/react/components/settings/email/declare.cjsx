NotifyController           = require '../../../controllers/notify'
SettingsEmailField         = require './fields/email'
SettingsEmailDeclareButton = require './buttons/declare'
{ PropTypes } = React

SettingsEmailDeclare = React.createClass
  displayName: 'SettingsEmailDeclare'

  propTypes:
    onDeclare: PropTypes.func.isRequired

  render: ->
    <div className="settings__item">
      <div className="settings__left">
        <h3 className="settings__title">
          { i18n.t('settings.email_declare_header') }
        </h3>
        <SettingsEmailField ref="emailField" />
        <div className="settings__email-actions">
          <SettingsEmailDeclareButton onClick={ @handleClick } />
        </div>
      </div>
    </div>

  isValid: ->
    email = @refs.emailField.getValue()

    if email.length == 0
      NotifyController.notifyError i18n.t('messages.settings_empty_email_error')
      false
    else true

  handleClick: ->
    email = @refs.emailField.getValue()

    @props.onDeclare(email) if @isValid()

module.exports = SettingsEmailDeclare