/*global i18n */
import React, { Component, PropTypes } from 'react';
import TabbedArea from '../Tabs/TabbedArea';
import TabPane from '../Tabs/TabPane';
import PanelFollowings from './PanelFollowings';
import PanelFollowers from './PanelFollowers';
//import PanelRequested from './PanelRequested';
//import PanelIgnored from './PanelIgnored';
//import PanelVkontakte from './PanelVkontakte';
//import PanelFacebook from './PanelFacebook';
import Popup from '../Popup';
import { connect } from 'react-redux';
import {
  getRelsByFriend,
  getRelsToFriend,
  getRelsByRequested,
  getRelsToIgnored,
  RELS_TO_FRIEND,
  RELS_BY_FRIEND,
} from '../../actions/RelsActions';
import {
  unfollowFrom,
  REL_FRIEND_STATE,
} from '../../actions/RelationshipActions';
import { Map } from 'immutable';

const emptyRelUser = Map();

class RelationManagerPopup extends Component {
  componentWillMount() {
    const { getMyRelsByFriend, getMyRelsToFriend } = this.props;

    getMyRelsToFriend();
    getMyRelsByFriend();
  }
  render() {
    const { isPrivacy, onClose } = this.props;
    const { followingsTotalCount, followings, followingsState, getMyRelsToFriend } = this.props;
    const { followersTotalCount, followers, followersState, getMyRelsByFriend, unfollowFromMe } = this.props;

    /*
      followersTotalCount, requestedTotalCount, ignoredTotalCount } = this.props;
    */

    return (
      <Popup
        className="popup--persons popup--dark"
        clue="persons_popup"
        draggable
        onClose={onClose}
        title={i18n.t('persons_popup_header')}
      >
        <TabbedArea>
          <TabPane count={followingsTotalCount} tab={i18n.t('persons_popup.menu.followings')}>
            <PanelFollowings
              loadMoreData={getMyRelsToFriend}
              relations={followings}
              relationsState={followingsState}
              totalCount={followingsTotalCount}
            />
          </TabPane>
          <TabPane count={followersTotalCount} tab={i18n.t('persons_popup.menu.followers')}>
            <PanelFollowers
              isPrivacy={isPrivacy}
              loadMoreData={getMyRelsByFriend}
              relations={followers}
              relationsState={followersState}
              totalCount={followersTotalCount}
              unfollowFromMe={unfollowFromMe}
            />
          </TabPane>
        </TabbedArea>
      </Popup>
    );
      /*
          <TabPane count={requestedTotalCount} tab={i18n.t('persons_popup.menu.requested')}>
            <PanelRequested />
          </TabPane>
          <TabPane count={ignoredTotalCount} tab={i18n.t('persons_popup.menu.ignored')}>
            <PanelIgnored />
          </TabPane>
          <TabPane tab={i18n.t('persons_popup.menu.vkontakte')}>
            <PanelVkontakte />
          </TabPane>
          <TabPane tab={i18n.t('persons_popup.menu.facebook')}>
            <PanelFacebook />
          </TabPane>
        </TabbedArea>
      </Popup>
    );
    */
  }
}

RelationManagerPopup.propTypes = {
  followers: PropTypes.object.isRequired,
  followersState: PropTypes.object.isRequired,
  followersTotalCount: PropTypes.number.isRequired,
  followings: PropTypes.object.isRequired,
  followingsState: PropTypes.object.isRequired,
  followingsTotalCount: PropTypes.number.isRequired,
  getMyRelsByFriend: PropTypes.func.isRequired,
  getMyRelsToFriend: PropTypes.func.isRequired,
  isPrivacy: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  unfollowFromMe: PropTypes.func.isRequired,
};

export default connect(
  (state) => {
    const currentUserId = state.currentUser.data.id;
    const followings = state
          .entities
          .get('rel')
          .filter((r) => r.get('readerId') === currentUserId && r.get('state') === REL_FRIEND_STATE)
          .sortBy((r) => r.get('position'))
          .map((r) => r.set('user', state.entities.getIn([ 'tlog', String(r.get('userId')) ], emptyRelUser)));
    const followingsState = state.rels.get(RELS_TO_FRIEND, Map());
    const followingsTotalCount = followingsState.get('unloadedCount', 0) + followings.count();

    const followers = state
      .entities
      .get('rel')
      .filter((r) => r.get('userId') === currentUserId && r.get('state') === REL_FRIEND_STATE)
      .sortBy((r) => r.get('position'))
      .map((r) => r.set('reader', state.entities.getIn([ 'tlog', String(r.get('readerId')) ], emptyRelUser)));
    const followersState = state.rels.get(RELS_BY_FRIEND, Map());
    const followersTotalCount = followersState.get('unloadedCount', 0) + followers.count();

    return {
      currentUserId,
      isPrivacy: state.currentUser.data.isPrivacy,
      followers,
      followersState,
      followersTotalCount,
      followings,
      followingsState,
      followingsTotalCount,
    };
  },
  { getRelsByFriend, getRelsToFriend, unfollowFrom },
  (stateProps, dispatchProps, ownProps) => Object.assign(
    {},
    stateProps,
    {
      getMyRelsByFriend: dispatchProps.getRelsByFriend.bind(null, stateProps.currentUserId, true),
      getMyRelsToFriend: dispatchProps.getRelsToFriend.bind(null, stateProps.currentUserId),
      unfollowFromMe: dispatchProps.unfollowFrom.bind(null, stateProps.currentUserId),
    },
    ownProps
  )
)(RelationManagerPopup);
