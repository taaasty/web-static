import React, { PropTypes } from 'react';
import DesignSettingsRadio from './DesignSettingsRadio';

function DesignSettingsRadioList(props) {
  const {
    style,
    optionName,
    value,
    items,
    className,
    onChange,
  } = props;

  render: ->
    listClasses = ['form-radiogroup', 'form-radiogroup--' + @props.style, @props.className].join ' '

    listItems = _.map @props.items, (item) =>
      value = item
      custom = false
      checked = @props.value is value

      if item is ':ANY:'
        value = @props.value
        custom = true
        checked = @props.items.indexOf(value) is -1

      <DesignSettingsRadio
          value={ value }
          custom={ custom }
          checked={ checked }
          optionName={ @props.optionName }
          onChange={ @props.onChange }
          key={ item } />

    return <span className={ listClasses }>
             { listItems}
           </span>
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
