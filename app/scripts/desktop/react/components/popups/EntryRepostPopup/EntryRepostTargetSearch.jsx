/*global i18n */
import React, { PropTypes } from 'react';

export function EntryRepostTargetSearch({ onChange, value }) {
  function handleChange(e) {
    onChange(e.target.value);
  }

  return (
    <input
      className="user__search"
      defaultValue={value}
      onChange={handleChange}
      placeholder={i18n.t('entry.repost.search_placeholder')}
      type="text"
    />
  );
}

EntryRepostTargetSearch.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default EntryRepostTargetSearch;
