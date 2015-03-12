{ PropTypes } = React

DesignSettingsSaveButton = React.createClass
  displayName: 'DesignSettingsSaveButton'

  propTypes:
    hasPaidValues: PropTypes.bool.isRequired
    onClick: PropTypes.func

  render: ->
    <button className="design-settings__save-button">
      { @getTitle() }
    </button>

  getTitle: ->
    if @props.hasPaidValues then 'Оплатить и сохранить' else 'Сохранить'

module.exports = DesignSettingsSaveButton