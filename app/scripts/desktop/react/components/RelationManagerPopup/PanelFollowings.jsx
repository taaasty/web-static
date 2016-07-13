import React, { PropTypes } from 'react';
import Panel from './Panel';
import PersonItem from './PersonItem';
import RelationButton from '../RelationButton';

function PanelFollowings({ loadMoreData, relations, relationsState, totalCount }) {
  return (
    <Panel
      canLoadMore={relations.count() === totalCount}
      isEmpty={!relations.count()}
      isError={!!relationsState.get('error')}
      isFetching={relationsState.get('isFetching', false)}
      loadMoreData={loadMoreData}
    >
      <ul className="persons">
        {relations.map((rel, relId) => (
           <PersonItem key={`following-item-${relId}`} user={rel.get('user')}>
             <RelationButton relId={relId} />
           </PersonItem>
         )).valueSeq()}
      </ul>
    </Panel>
  );
}

PanelFollowings.propTypes = {
  loadMoreData: PropTypes.func.isRequired,
  relations: PropTypes.object.isRequired,
  relationsState: PropTypes.object.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default PanelFollowings;
