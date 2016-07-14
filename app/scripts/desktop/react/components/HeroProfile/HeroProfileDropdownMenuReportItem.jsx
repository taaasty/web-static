/*global i18n */
import React, { PropTypes } from 'react';

function HeroProfileDropdownMenuReportItem({ tlogReport }) {
  return (
    <a
      className="action-dropdown-item"
      onClick={tlogReport}
    >
      <i className="icon icon--exclamation-mark" />
      {i18n.t('report_tlog_item')}
    </a>
  );
}

HeroProfileDropdownMenuReportItem.propTypes = {
  tlogReport: PropTypes.func.isRequired,
};

export default HeroProfileDropdownMenuReportItem;
