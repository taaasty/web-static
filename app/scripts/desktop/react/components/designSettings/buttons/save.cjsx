{ PropTypes } = React

DesignSettingsSaveButton = React.createClass
  displayName: 'DesignSettingsSaveButton'

  propTypes:
    hasPaidValues: PropTypes.bool.isRequired
    hasDesignBundle: PropTypes.bool.isRequired
    onClick: PropTypes.func

  render: ->
    <button className="design-settings__save-button"
            onClick={ @handleClick }>
      { @getTitle() }
    </button>

  getTitle: ->
    if @props.hasDesignBundle || !@props.hasPaidValues
      'Сохранить'
    else
      'Оплатить и сохранить'

  handleClick: ->
    @props.onClick()

module.exports = DesignSettingsSaveButton