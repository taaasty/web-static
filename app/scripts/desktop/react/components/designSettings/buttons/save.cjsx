{ PropTypes } = React

DesignSettingsSaveButton = React.createClass
  displayName: 'DesignSettingsSaveButton'

  propTypes:
    onClick: PropTypes.func

  render: ->
    <button className="design-settings__save-button">
      Сохранить
    </button>

module.exports = DesignSettingsSaveButton