import React, { PropTypes } from 'react';
import Switcher from '../common/Switcher';

function FlowFormRadio(props) {
  const { description, title } = props;

  return (
    <div>
      <div className="flow-form__right">
        <Switcher {...props} />
      </div>
      <div className="flow-form__left">
        <h3 className="flow-form__title">
          {title}
        </h3>
        {description &&
         <p className="flow-form__desc">
           {description}
         </p>
        }
      </div>
    </div>
  );
}

FlowFormRadio.propTypes = {
  checked: PropTypes.bool.isRequired,
  description: PropTypes.string,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default FlowFormRadio;
