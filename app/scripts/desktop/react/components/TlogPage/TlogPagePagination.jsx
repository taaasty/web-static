/*global i18n */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function TlogPagePagination({ nextPagePath, prevPagePath }) {
  return (
    <nav className="pagination">
      {prevPagePath &&
       <Link
         className="pagination__item pagination__item--prev"
         to={prevPagePath}
       >
         {i18n.t('tlog.earlier')}
       </Link>
      }
      {nextPagePath &&
       <Link
         className="pagination__item pagination__item--next"
         to={nextPagePath}
       >
         {i18n.t('tlog.later')}
       </Link>
      }
    </nav>
  );
}

TlogPagePagination.propTypes = {
  nextPagePath: PropTypes.string,
  prevPagePath: PropTypes.string,
};

export default TlogPagePagination;
