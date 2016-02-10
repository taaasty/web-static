/*global i18n */
import React, { PropTypes } from 'react';
import Spinner from '../../../../shared/react/components/common/Spinner';

function EntryTlogCommentsLoadMore({ limit, loadedCount, loading, onLoadMore, totalCount }) {
  function getTitle() {
    const remainingCount = totalCount - loadedCount;
    const possibleCount  = loadedCount + limit;

    if (possibleCount < totalCount) {
      return i18n.t('load_more_comments', { count: limit });
    } else {
      return i18n.t('load_more_comments_remaining', { count: remainingCount });
    }
  }

  return (
    <div className="comments__more" onClick={onLoadMore}>
      <a className="comments__more-link">
        {getTitle()}
        {' '}{loading && <Spinner size={8} />}
      </a>
    </div>
  );
}

EntryTlogCommentsLoadMore.propTypes = {
  limit: PropTypes.number.isRequired,
  loadedCount: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default EntryTlogCommentsLoadMore;
