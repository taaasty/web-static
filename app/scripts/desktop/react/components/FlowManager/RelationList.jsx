/*global i18n */
import React, { PropTypes } from 'react';
import Scroller from '../common/Scroller';
import Spinner from '../../../../shared/react/components/common/Spinner';

function RelationList({ canLoad, children, isEmpty, isError, isFetching, onLoadMore }) {
  function handleScroll(ev) {
    if (!canLoad) {
      return;
    }

    const el = ev.target;
    if (el.scrollTop + el.offsetHeight > el.scrollHeight * .9) {
      onLoadMore();
    }
  }

  function renderMessage(msg) {
    return (
      <div className="grid-full">
        <div className="grid-full__middle">
          <div className="popup__text">
            {msg}
          </div>
        </div>
      </div>
    );
  }

  function renderContents() {
    if (isEmpty) {
      return isFetching
        ? renderMessage(<Spinner size={14} />)
        : renderMessage(i18n.t('manage_flow.empty_list'));
    } else {
      return isError
        ? renderMessage(i18n.t('manage_flow.error_list'))
        : (
          <ul className="persons">
            {children}
            {isFetching && (
               <div className="loader">
                 <Spinner size={14} />
               </div>
            )}
          </ul>
        );
    }
  }

  return (
    <Scroller className="scroller--relationships" onScroll={handleScroll}>
      {renderContents()}
    </Scroller>
  );
}

RelationList.propTypes = {
  canLoad: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]),
  isEmpty: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onLoadMore: PropTypes.func.isRequired,
};

export default RelationList;
