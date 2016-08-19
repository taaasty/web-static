import React, { PropTypes } from 'react';
import Select from 'react-select';

function SettingsLanguage({ languages, onChange, title, value }) {
  function handleSelect({ value: newValue }) {
    if (value !== newValue) {
      onChange(newValue);
    }
  }

  return (
    <div className="settings__item">
      <div className="settings__right">
        <div className="settings__select-container">
          <Select
            clearable={false}
            labelKey="text"
            multi={false}
            onChange={handleSelect}
            options={languages}
            searchable={false}
            value={value}
          />
        </div>
      </div>
      <div className="settings__left">
        <h3 className="settings__title">
          {title}
        </h3>
      </div>
    </div>
  );
}

SettingsLanguage.propTypes = {
  languages: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default SettingsLanguage;
