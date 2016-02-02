{ PropTypes } = React

SettingsEmailChangeButton = React.createClass
  displayName: 'SettingsEmailChangeButton'

  propTypes:
    onClick: PropTypes.func.isRequired

  render: ->
    <button className="settings__change-button"
            onClick={ @handleClick }>
      { i18n.t('buttons.settings_email_change') }
    </button>

  handleClick: (e) ->
    e.preventDefault()
    @props.onClick()

module.exports = SettingsEmailChangeButton