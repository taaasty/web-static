{ PropTypes } = React

SettingsSaveButton = React.createClass
  displayName: 'SettingsSaveButton'

  propTypes:
    onClick: PropTypes.func.isRequired

  render: ->
    <div className="settings__item">
      <button
          className="settings__submit"
          onClick={ @handleClick }>
        { i18n.t('buttons.settings_save') }
      </button>
    </div>

  handleClick: (e) ->
    e.preventDefault()
    @props.onClick()

module.exports = SettingsSaveButton