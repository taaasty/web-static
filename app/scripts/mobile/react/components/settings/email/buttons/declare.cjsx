{ PropTypes } = React

SettingsEmailDeclareButton = React.createClass
  displayName: 'SettingsEmailDeclareButton'

  propTypes:
    onClick: PropTypes.func.isRequired

  render: ->
    <button className="settings__declare-button"
            onClick={ @handleClick }>
      { i18n.t('buttons.settings_email_declare') }
    </button>

  handleClick: (e) ->
    e.preventDefault()
    @props.onClick()

module.exports = SettingsEmailDeclareButton