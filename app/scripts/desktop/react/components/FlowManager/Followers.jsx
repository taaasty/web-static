import React, { PropTypes } from 'react';
import RelationList from './RelationList';
import RelationListItem from './RelationListItem';
import ButtonUnfollow from './ButtonUnfollow';

function Followers({ followers, followersState, getFollowers, unfollowFrom }) {
  function handleButtonClick(follower, relId) {
    unfollowFrom(follower.get('userId'), follower.getIn([ 'reader', 'id' ]), relId);
  }
  
  return (
    <RelationList
      canLoad={followers.count() !== followersState.getIn([ 'data', 'totalCount' ])}
      isEmpty={!followers.count()}
      isError={!!followersState.get('error')}
      isFetching={followersState.get('isFetching', false)}
      onLoadMore={getFollowers}
    >
      {followers.map((follower, relId) => (
         <RelationListItem key={`rel-item-${relId}`} user={follower.get('reader')}>
           <ButtonUnfollow onClick={handleButtonClick.bind(null, follower, relId)} />
         </RelationListItem>
       )).valueSeq()}
    </RelationList>
  );
}

Followers.propTypes = {
  followers: PropTypes.object.isRequired,
  followersState: PropTypes.object.isRequired,
  getFollowers: PropTypes.func.isRequired,
  unfollowFrom: PropTypes.func.isRequired,
};

export default Followers;
