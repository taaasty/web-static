import React, { Component, PropTypes } from 'react';
import DesignSettingsColorPicker from './common/colorPicker';

class DesignSettingsRadio extends Component {
  handleChange() {
    const { isColorPicker, onChange, option } = this.props;

    return onChange(isColorPicker ? this.refs.colorPicker.getValue() : option.get('value'));
  }
  render() {
    const {
      checked,
      isColorPicker,
      option,
      optionName,
      onChange,
      value,
    } = this.props;

    const name = isColorPicker ? 'custom' : option.get('name');
    const optionTitle = option.get('title');
    const title = typeof optionTitle === 'function' ? optionTitle.call(null) : optionTitle;

    return (
      <span className={`form-radiobtn form-radiobtn--${name}`}>
        <input
          checked={checked}
          className="form-radiobtn__input"
          id={`${optionName}-${name}`}
          onChange={this.handleChange.bind(this)}
          type="radio"
        />
        <label
          className="form-radiobtn__label"
          htmlFor={`${optionName}-${name}`}
        >
          {option.get('free') && (
             <span className="free">
               free
             </span>
           )}
             <span className="form-radiobtn__inner">
               <span className="form-radiobtn__text">
                 {title}
               </span>
             </span>
             {isColorPicker && (
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
}

DesignSettingsRadio.propTypes = {
  checked: PropTypes.bool.isRequired,
  isColorPicker: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  option: PropTypes.object.isRequired,
  optionName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
  
export default DesignSettingsRadio;
