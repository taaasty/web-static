import React, { PropTypes } from 'react';
import Routes from '../../../../shared/routes/routes';
import * as ProjectTypes from '../../../../shared/react/ProjectTypes';

import PaginationPrev from './items/prev';
import PaginationNext from './items/next';

class TlogPagination {
  renderPaginationItems() {
    const { pagination: { currentPage, totalPagesCount, type }, slug } = this.props;
    const paginationItems = [];

    switch(false) {
    case !(currentPage == 0 && totalPagesCount == 0):
      break;
    case !(currentPage == 1 && totalPagesCount > 1):
      paginationItems.push(
        <PaginationPrev
          href={Routes.tlogPagination(slug, type, currentPage + 1)}
          key="prev"
          single={true}
        />);
      break;
    case !(totalPagesCount > currentPage > 1):
      paginationItems.push(
        <PaginationPrev
          href={Routes.tlogPagination(slug, type, currentPage + 1)}
          key="prev"
        />);
      paginationItems.push(
        <PaginationNext
          href={Routes.tlogPagination(slug, type, currentPage - 1)}
          key="next"
        />);
      break;
    case !(currentPage > totalPagesCount):
      paginationItems.push(
        <PaginationNext
          href={Routes.tlogPagination(slug, type, totalPagesCount)}
          key="next"
          single={true}
        />);
      break;
    case !(currentPage == totalPagesCount && currentPage != 1):
      paginationItems.push(
        <PaginationNext
          href={Routes.tlogPagination(slug, type, currentPage - 1)}
          key="next"
          single={true}
        />);
      break;
    }

    return paginationItems;
  }
  render() {
    return (
      <div className="pagination">
        {this.renderPaginationItems()}  
      </div>
    );
  }

}

TlogPagination.propTypes = {
  pagination: ProjectTypes.pagination.isRequired,
  slug: PropTypes.string.isRequired,
};


  
module.exports = TlogPagination
