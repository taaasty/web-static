DesignSettingsColorPicker = require '../../designSettings/common/colorPicker'
{ PropTypes } = React

DesignSettingsPaymentRadio = React.createClass
  displayName: 'DesignSettingsPaymentRadio'

  propTypes:
    value: PropTypes.string.isRequired
    custom: PropTypes.bool.isRequired

  render: ->
    name = if @props.custom then 'custom' else @props.value

    return <span className={ 'form-radiobtn form-radiobtn--' + name }>
             <label className="form-radiobtn__label">
               <span className="form-radiobtn__inner">
                 <span className="form-radiobtn__text">
                   Aa
                 </span>
               </span>
               { @renderColorPicker() }
             </label>
           </span>

  renderColorPicker: ->
    <DesignSettingsColorPicker /> if @props.custom

module.exports = DesignSettingsPaymentRadio