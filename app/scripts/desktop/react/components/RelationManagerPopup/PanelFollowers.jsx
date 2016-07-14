import React, { PropTypes } from 'react';
import Panel from './Panel';
import PersonItem from './PersonItem';
import RelationButton from '../RelationButton';

function PanelFollowers(props) {
  const { isPrivacy, unfollowFromMe, relations } = props;

  return (
    <Panel {...props}>
      <ul className="persors">
        {relations.map((rel, relId) => (
           <PersonItem key={`follower-item-${relId}`} user={rel.get('reader')}>
             <RelationButton relId={rel.get('reverseRelationship')} />
             {isPrivacy && (
                <button
                  className="button button--small button--outline-light-white button--icon"
                  onClick={unfollowFromMe.bind(null, rel.get('readerId'))}
                >
                  <i className="icon icon--cross" />
                </button>
              )}
           </PersonItem>
         )).valueSeq()}
      </ul>
    </Panel>
  );
}

PanelFollowers.propTypes = {
  isPrivacy: PropTypes.bool.isRequired,
  loadMoreData: PropTypes.func.isRequired,
  relations: PropTypes.object.isRequired,
  relationsState: PropTypes.object.isRequired,
  totalCount: PropTypes.number.isRequired,
  unfollowFromMe: PropTypes.func.isRequired,
};

export default PanelFollowers;
