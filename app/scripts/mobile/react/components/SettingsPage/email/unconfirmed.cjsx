SettingsEmailField        = require './fields/email'
SettingsEmailCancelButton = require './buttons/cancel'
{ PropTypes } = React

SettingsEmailUnconfirmed = React.createClass
  displayName: 'SettingsEmailUnconfirmed'

  propTypes:
    confirmationEmail: PropTypes.oneOfType [PropTypes.string, PropTypes.object]
    onCancel:          PropTypes.func.isRequired

  render: ->
    <div className="settings__item">
      <div className="settings__left">
        <h3 className="settings__title">
          { i18n.t('settings.email_unconfirmed_header') }
        </h3>
        <SettingsEmailField
            value={ @props.confirmationEmail }
            disabled={ true } />
        <div className="settings__actions">
          <SettingsEmailCancelButton onClick={ @handleClick } />
        </div>
      </div>
    </div>

  handleClick: ->
    @props.onCancel()

module.exports = SettingsEmailUnconfirmed