import React, { PropTypes } from 'react';
import RelationList from './RelationList';
import RelationListItem from './RelationListItem';
import ButtonIgnore from './ButtonIgnore';
import ButtonCancel from './ButtonCancel';
import { REL_IGNORED_STATE } from '../../actions/RelationshipActions';

function Ignored({ cancelIgnoreTlog, getIgnored, ignoreTlog, ignored, ignoredState }) {
  function handleButtonIgnoreClick(ignored, relId) {
    cancelIgnoreTlog(ignored.get('readerId'), ignored.get('userId'), relId);
  }

  function handleButtonCancelClick(ignored, relId) {
    ignoreTlog(ignored.get('readerId'), ignored.get('userId'), relId);
  }

  return (
    <RelationList
      canLoad={ignored.count() !== ignoredState.getIn([ 'data', 'totalCount' ])}
      isEmpty={!ignored.count()}
      isError={!!ignoredState.get('error')}
      isFetching={ignoredState.get('isFetching', false)}
      onLoadMore={getIgnored}
    >
      {ignored.map((rel, relId) => (
         <RelationListItem key={`ignore-item-${relId}`} user={rel.get('user')}>
           {rel.get('state') === REL_IGNORED_STATE
            ? <ButtonIgnore
                isError={!!rel.getIn([ 'relState', 'error' ])}
                isFetching={!!rel.getIn([ 'relState', 'isFetching' ])}
                onClick={handleButtonIgnoreClick.bind(null, rel, relId)}
              />
            : <ButtonCancel
                isError={!!rel.getIn([ 'relState', 'error' ])}
                isFetching={!!rel.getIn([ 'relState', 'isFetching' ])}
                onClick={handleButtonCancelClick.bind(null, rel, relId)}
              />
           }
         </RelationListItem>
       )).valueSeq()}
    </RelationList>
  );
}

Ignored.propTypes = {
  cancelIgnoreTlog: PropTypes.func.isRequired,
  getIgnored: PropTypes.func.isRequired,
  ignoreTlog: PropTypes.func.isRequired,
  ignored: PropTypes.object.isRequired,
  ignoredState: PropTypes.object.isRequired,
};

export default Ignored;
