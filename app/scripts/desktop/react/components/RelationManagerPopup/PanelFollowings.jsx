import React, { PropTypes } from 'react';
import Panel from './Panel';
import PersonItem from './PersonItem';
import RelationButton from '../RelationButton';

function PanelFollowings(props) {
  return (
    <Panel {...props}>
      <ul className="persons">
        {props.relations.map((rel, relId) => (
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
