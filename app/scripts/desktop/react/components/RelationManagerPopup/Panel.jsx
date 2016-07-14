/*global i18n */
import React, { PropTypes } from 'react';
import Scroller from '../common/Scroller';

function Panel({ children, loadMoreData, relations, relationsState, totalCount }) {
  const isEmpty = !relations.count();
  const isFetching = relationsState.get('isFetching', false);
  const isError = !!relationsState.get('error');
  const canLoadMore = relations.count() < totalCount;

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
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]),
  loadMoreData: PropTypes.func.isRequired,
  relations: PropTypes.object.isRequired,
  relationsState: PropTypes.object.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default Panel;
