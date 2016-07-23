import React, { PropTypes } from 'react';
import classNames from 'classnames';
import DesignSettingsRadio from './DesignSettingsRadio';

function DesignSettingsRadioList(props) {
  const {
    className,
    items,
    onChange,
    optionName,
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
      {items.map((item) => {
        const [ val, custom, checked ] = item === ':ANY:'
              ? [ value, true, !items.includes(value) ]
              : [ item, false, item === value ];

        return (
          <DesignSettingsRadio
            checked={checked}
            custom={custom}
            isFree={isFree}
            key={item}
            onChange={onChange}
            optionName={optionName}
            value={val}
          />
        );
      })}
    </span>
  );
}

DesignSettingsRadioList.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  optionName: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default DesignSettingsRadioList;
