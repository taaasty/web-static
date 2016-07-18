import React, { PropTypes } from 'react';
import SelectBox from '../common/SelectBox/SelectBox';

function SettingsLanguage({ languages, onChange, title, value }) {
  function handleChange(language) {
    onChange(language);
  }

  return (
    <div className="settings__item">
      <div className="settings__right">
        <SelectBox
          onSelect={handleChange}
          options={languages}
          value={value}
          withSearchBox={false}
        />
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
