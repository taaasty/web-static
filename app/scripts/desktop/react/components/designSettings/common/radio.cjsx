DesignPresenterService = require '../../../services/designPresenter'
DesignSettingsService = require '../../../services/designSettings'
DesignSettingsColorPicker = require './colorPicker'
{ PropTypes } = React

DesignSettingsRadio = React.createClass
  displayName: 'DesignSettingsRadio'

  propTypes:
    value: PropTypes.string.isRequired
    custom: PropTypes.bool.isRequired
    checked: PropTypes.bool.isRequired
    optionName: PropTypes.string.isRequired
    onChange: PropTypes.func.isRequired

  getInitialState: ->
    name: DesignPresenterService.getName @props.optionName, @props.value
    text: DesignPresenterService.getText @props.optionName, @props.value
    free: DesignSettingsService.isPaidValue @props.optionName, @props.value

  render: ->
    name = if @props.custom then 'custom' else @state.name

    return <span className={ 'form-radiobtn form-radiobtn--' + name }>
             <input type="radio"
                    checked={ @props.checked }
                    id={ @props.optionName + '-' + name }
                    className="form-radiobtn__input"
                    onChange={ @handleChange } />
             <label htmlFor={ @props.optionName + '-' + name }
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
    if @props.custom
      <DesignSettingsColorPicker
          ref="colorPicker"
          color={ @props.value }
          onChange={ @props.onChange } />

  renderFreeLabel: ->
    <span className="free">free</span> if @state.free

  handleChange: ->
    value = if @refs.colorPicker? then @refs.colorPicker.getValue() else @props.value
    @props.onChange value

module.exports = DesignSettingsRadio