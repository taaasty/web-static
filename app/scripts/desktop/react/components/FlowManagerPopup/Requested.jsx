import React, { PropTypes } from 'react';
import RelationList from './RelationList';
import RelationListItem from './RelationListItem';
import ButtonRequest from './ButtonRequest';

function Requested({ approveTlog, declineTlog, getRequested, requested, requestedState }) {
  function handleApproveClick(request, relId) {
    approveTlog(request.get('userId'), request.get('readerId'), relId);
  }

  function handleDeclineClick(request, relId) {
    declineTlog(request.get('userId'), request.get('readerId'), relId);
  }

  return (
    <RelationList
      canLoad={requested.count() !== requestedState.getIn([ 'data', 'totalCount' ])}
      isEmpty={!requested.count()}
      isError={!!requestedState.get('error')}
      isFetching={requestedState.get('isFetching', false)}
      onLoadMore={getRequested}
    >
      {requested.map((rel, relId) => (
         <RelationListItem key={`request-item-${relId}`} user={rel.get('reader')}>
           <ButtonRequest
             isError={!!rel.getIn([ 'relState', 'error' ])}
             isFetching={!!rel.getIn([ 'relState', 'isFetching' ])}
             onApproveClick={handleApproveClick.bind(null, rel, relId)}
             onDeclineClick={handleDeclineClick.bind(null, rel, relId)}
           />
         </RelationListItem>
       )).valueSeq()}
    </RelationList>
  );
}

Requested.propTypes = {
  approveTlog: PropTypes.func.isRequired,
  declineTlog: PropTypes.func.isRequired,
  getRequested: PropTypes.func.isRequired,
  requested: PropTypes.object.isRequired,
  requestedState: PropTypes.object.isRequired,
};

export default Requested;
