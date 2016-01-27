/*global i18n */
import React, { PropTypes } from 'react';

function TlogPagePagination({ nextPageUrl, prevPageUrl }) {
  return (
    <nav className="pagination">
      {prevPageUrl &&
       <a
         className="pagination__item pagination__item--prev"
         href={prevPageUrl}
       >
         {i18n.t('tlog.earlier')}
       </a>
      }
      {nextPageUrl &&
       <a
         className="pagination__item pagination__item--next"
         href={nextPageUrl}
       >
         {i18n.t('tlog.later')}
       </a>
      }
    </nav>
  );
}

TlogPagePagination.propTypes = {
  nextPageUrl: PropTypes.string,
  prevPageUrl: PropTypes.string,
};

export default TlogPagePagination;
