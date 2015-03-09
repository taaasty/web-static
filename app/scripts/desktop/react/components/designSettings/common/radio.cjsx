DesignPresenterService = require '../../../services/designPresenter'
DesignSettingsService = require '../../../services/designSettings'
DesignSettingsColorPicker = require './colorPicker'
{ PropTypes } = React

DesignSettingsRadio = React.createClass
  displayName: 'DesignSettingsRadio'

  propTypes:
    value: PropTypes.string.isRequired
    checked: PropTypes.bool.isRequired
    optionName: PropTypes.string.isRequired
    onChange: PropTypes.func.isRequired

  getInitialState: ->
    name: DesignPresenterService.getName @props.optionName, @props.value
    text: DesignPresenterService.getText @props.optionName, @props.value
    free: DesignSettingsService.isPaidValue @props.optionName, @props.value

  render: ->
    <span className={ 'form-radiobtn form-radiobtn--' + @state.name }>
      <input type="radio"
             checked={ @props.checked }
             id={ @props.optionName + '-' + @state.name }
             className="form-radiobtn__input"
             onChange={ @handleChange } />
      <label htmlFor={ @props.optionName + '-' + @state.name }
             className="form-radiobtn__label">
        { @renderFreeLabel() }
        <span className="form-radiobtn__inner">
          <span className="form-radiobtn__text">
            { @state.text }
          </span>
        </span>
        { @renderColorPicker() }
      </label>
    </span>

  renderColorPicker: ->
    <DesignSettingsColorPicker /> if @state.name is 'custom'

  renderFreeLabel: ->
    <span className="free">free</span> if @state.free

  handleChange: ->
    @props.onChange @props.value

module.exports = DesignSettingsRadio