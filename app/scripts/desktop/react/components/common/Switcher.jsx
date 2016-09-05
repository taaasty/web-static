/*global i18n */
import React, { PropTypes } from 'react';

function Switcher({ id, title, description, checked, labelOn, labelOff, onChange }) {
  function handleChange(ev) {
    onChange(ev.target.checked);
  }

  return (
    <div className="switcher">
      <input
        checked={checked}
        className="switcher__input"
        id={id}
        onChange={handleChange}
        type="checkbox"
      />
      <label className="switcher__label" htmlFor={id}>
        <span className="switcher__btn switcher__btn--on">
          {labelOn || i18n.t('switcher.label_on')}
        </span>
        <span className="switcher__btn switcher__btn--off">
          {labelOff || i18n.t('switcher.label_off')}
        </span>
      </label>
    </div>
  );
}

Switcher.propTypes = {
  checked: PropTypes.bool.isRequired,
  description: PropTypes.string,
  id: PropTypes.string.isRequired,
  labelOff: PropTypes.string,
  labelOn: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Switcher;
