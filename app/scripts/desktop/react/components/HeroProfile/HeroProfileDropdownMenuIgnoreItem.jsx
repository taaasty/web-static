/*global i18n */
import React, { PropTypes } from 'react';

function HeroProfileDropdownMenuIgnoreItem({ ignore }) {
  return (
    <a
      className="action-dropdown-item"
      onClick={ignore}
    >
      <i className="icon icon--not-allowed" />
      {i18n.t('ignore_tlog_item')}
    </a>
  );
}

HeroProfileDropdownMenuIgnoreItem.propTypes = {
  ignore: PropTypes.func.isRequired,
};

export default HeroProfileDropdownMenuIgnoreItem;
