import React, { PropTypes } from 'react';
import DesignOptionsService from '../../services/designOptions';
import DesignPresenterService from '../../services/designPresenter';
import DesignSettingsColorPicker from './common/colorPicker';

function DesignSettingsRadio(props) {
  const {
    value,
    custom,
    checked,
    isFree,
    optionName,
    onChange,
  } = props;

  function handleChange() {
    return onChange(custom ? this.refs.colorPicker.getValue() : value);
  }

  getInitialState: ->
    name: DesignPresenterService.getName @props.optionName, @props.value
    text: DesignPresenterService.getText @props.optionName, @props.value

  const name = custom ? 'custom' : name;

  return (
    <span className={`form-radiobtn form-radiobtn--${name}`}>
      <input
        className="form-radiobtn__input"
        checked={checked}
        id={`${optionName}-${name}`}
        onChange={handleChange}
        type="radio"
      />
      <label
        className="form-radiobtn__label"
        htmlFor={`${optionName}-${name}`}
      >
        {isFree && (
           <span className="free">
             free
           </span>
         )}
           <span className="form-radiobtn__inner">
             <span className="form-radiobtn__text">
               { @state.text }
             </span>
           </span>
           {custom && (
              <DesignSettingsColorPicker
                color={value}
                onChange={onChange}
                ref="colorPicker"
              />
            )}
      </label>
    </span>
  );
}

DesignSettingsRadio.propTypes = {
  checked: PropTypes.bool.isRequired,
  custom: PropTypes.bool.isRequired,
  isFree: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  optionName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
  
export default DesignSettingsRadio;
