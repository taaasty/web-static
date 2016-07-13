/*global i18n */
import React, { PropTypes } from 'react';
import Scroller from '../common/Scroller';

function Panel({ canLoadMore, children, isEmpty, isError, isFetching, loadMoreData }) {
  function renderMoreButton() {
    return (
      <div className="popup__more">
        <button
          className="more-button"
          onClick={loadMoreData}
        >
          {i18n.t('load_more_button')}
        </button>
      </div>
    );
  }

  function messageText() {
    return isError ? i18n.t('persons_popup_error')
      : isFetching ? i18n.t('persons_popup_loading')
      : isEmpty ? i18n.t('persons_popup_empty')
      : '';
  }

  function renderMessage() {
    return (
      <div className="grid-full">
        <div className="grid-full__middle">
          <div className="popup__text">
            {messageText()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Scroller className="scroller--persons">
      {!isEmpty ? children : renderMessage()}
      {canLoadMore && renderMoreButton()}
    </Scroller>
  );
};

Panel.propTypes = {
  canLoadMore: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]),
  isEmpty: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  loadMoreData: PropTypes.func.isRequired,
};

export default Panel;
