import React, { PropTypes } from 'react';
import classNames from 'classnames';
import DesignSettingsRadio from './DesignSettingsRadio';

function DesignSettingsRadioList(props) {
  const {
    className,
    onChange,
    optionName,
    options,
    style,
    value,
  } = props;

  const listClasses = classNames(
    'form-radiogroup',
    `form-radiogroup--${style}`,
    className
  );

  return (
    <span className={listClasses}>
      {options.map((option) => {
        const isColorPicker = option.get('value') === ':COLOR_PICKER:';
        const checked = isColorPicker
              ? options.find((o) => o.get('value') === value, null, false) === false
              : option.get('value') === value;

        return (
          <DesignSettingsRadio
            checked={checked}
            isColorPicker={isColorPicker}
            key={option.get('value')}
            onChange={onChange}
            option={option}
            optionName={optionName}
            value={value}
          />
        );
      })}
    </span>
  );
}

DesignSettingsRadioList.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  optionName: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  style: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default DesignSettingsRadioList;
