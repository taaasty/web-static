{ PropTypes } = React

SettingsEmailCancelButton = React.createClass
  displayName: 'SettingsEmailCancelButton'

  propTypes:
    onClick: PropTypes.func.isRequired

  render: ->
    <button className="settings__cancel-button"
            onClick={ @handleClick }>
      { i18n.t('buttons.settings_email_cancel') }
    </button>

  handleClick: (e) ->
    e.preventDefault()
    @props.onClick()

module.exports = SettingsEmailCancelButton