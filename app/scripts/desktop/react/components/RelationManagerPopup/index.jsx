/*global i18n */
import React, { Component, PropTypes } from 'react';
import TabbedArea from '../Tabs/TabbedArea';
import TabPane from '../Tabs/TabPane';
import PanelFollowings from './PanelFollowings';
import PanelFollowers from './PanelFollowers';
import PanelRequested from './PanelRequested';
import PanelIgnored from './PanelIgnored';
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
  RELS_TO_IGNORED,
  RELS_BY_FRIEND,
  RELS_BY_REQUESTED,
} from '../../actions/RelsActions';
import {
  approveTlog,
  cancelIgnoreTlog,
  declineTlog,
  ignoreTlog,
  unfollowFrom,
  REL_FRIEND_STATE,
  REL_REQUESTED_STATE,
  REL_IGNORED_STATE,
} from '../../actions/RelationshipActions';
import { Map } from 'immutable';

const emptyRelUser = Map();
const emptyRelState = Map();

class RelationManagerPopup extends Component {
  componentWillMount() {
    const { getMyRelsByFriend, getMyRelsByRequested,
            getMyRelsToIgnored, getMyRelsToFriend } = this.props;

    getMyRelsToFriend();
    getMyRelsByFriend();
    getMyRelsByRequested();
    getMyRelsToIgnored();
  }
  render() {
    const { isPrivacy, onClose } = this.props;
    const { followingsTotalCount, followings, followingsState, getMyRelsToFriend } = this.props;
    const { followersTotalCount, followers, followersState, getMyRelsByFriend, unfollowFromMe } = this.props;
    const { approveTlog, declineTlog, requestedTotalCount, requested, requestedState, getMyRelsByRequested } = this.props;
    const { cancelIgnoreTlog, getMyRelsToIgnored, ignoreTlog, ignoredTotalCount, ignored, ignoredState } = this.props;

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
          <TabPane count={requestedTotalCount} tab={i18n.t('persons_popup.menu.requested')}>
            <PanelRequested
              approveTlog={approveTlog}
              declineTlog={declineTlog}
              loadMoreData={getMyRelsByRequested}
              relations={requested}
              relationsState={requestedState}
              totalCount={requestedTotalCount}
            />
          </TabPane>
          <TabPane count={ignoredTotalCount} tab={i18n.t('persons_popup.menu.ignored')}>
            <PanelIgnored
              cancelIgnoreTlog={cancelIgnoreTlog}
              ignoreTlog={ignoreTlog}
              loadMoreData={getMyRelsToIgnored}
              relations={ignored}
              relationsState={ignoredState}
              totalCount={ignoredTotalCount}
            />
          </TabPane>
        </TabbedArea>
      </Popup>
    );
    /*
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
  approveTlog: PropTypes.func.isRequired,
  declineTlog: PropTypes.func.isRequired,
  followers: PropTypes.object.isRequired,
  followersState: PropTypes.object.isRequired,
  followersTotalCount: PropTypes.number.isRequired,
  followings: PropTypes.object.isRequired,
  followingsState: PropTypes.object.isRequired,
  followingsTotalCount: PropTypes.number.isRequired,
  getMyRelsByFriend: PropTypes.func.isRequired,
  getMyRelsByRequested: PropTypes.func.isRequired,
  getMyRelsToFriend: PropTypes.func.isRequired,
  isPrivacy: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  requested: PropTypes.object.isRequired,
  requestedState: PropTypes.object.isRequired,
  requestedTotalCount: PropTypes.number.isRequired,
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

    const requested = state
      .entities
      .get('rel')
      .filter((r) => r.get('userId') === currentUserId && r.get('state') === REL_REQUESTED_STATE)
      .sortBy((r) => r.get('position'))
      .map((r) => r.set('reader', state.entities.getIn([ 'tlog', String(r.get('readerId')) ], emptyRelUser)))
      .map((r, rId) => r.set('relState', state.relState.get(rId, emptyRelState)));
    const requestedState = state.rels.get(RELS_BY_REQUESTED, Map());
    const requestedTotalCount = requestedState.get('unloadedCount', 0) + requested.count();

    const ignored = state
      .entities
      .get('rel')
      .filter((r) => r.get('readerId') === currentUserId && r.get('state') === REL_IGNORED_STATE)
      .sortBy((r) => r.get('position'))
      .map((r) => r.set('user', state.entities.getIn([ 'tlog', String(r.get('userId')) ], emptyRelUser)))
      .map((r, rId) => r.set('relState', state.relState.get(rId, emptyRelState)));
    const ignoredState = state.rels.get(RELS_TO_IGNORED, Map());
    const ignoredTotalCount = ignoredState.get('unloadedCount', 0) + ignored.count();

    return {
      currentUserId,
      isPrivacy: state.currentUser.data.isPrivacy,
      ignored,
      ignoredState,
      ignoredTotalCount,
      followers,
      followersState,
      followersTotalCount,
      followings,
      followingsState,
      followingsTotalCount,
      requested,
      requestedState,
      requestedTotalCount,
    };
  },
  { approveTlog, cancelIgnoreTlog, declineTlog, getRelsByFriend, getRelsByRequested,
    getRelsToFriend, getRelsToIgnored, ignoreTlog, unfollowFrom },
  (stateProps, dispatchProps, ownProps) => Object.assign(
    {},
    stateProps,
    {
      approveTlog: dispatchProps.approveTlog.bind(null, stateProps.currentUserId),
      cancelIgnoreTlog: dispatchProps.cancelIgnoreTlog.bind(null, stateProps.currentUserId),
      declineTlog: dispatchProps.declineTlog.bind(null, stateProps.currentUserId),
      getMyRelsByFriend: dispatchProps.getRelsByFriend.bind(null, stateProps.currentUserId, true),
      getMyRelsByRequested: dispatchProps.getRelsByRequested.bind(null, stateProps.currentUserId),
      getMyRelsToFriend: dispatchProps.getRelsToFriend.bind(null, stateProps.currentUserId),
      getMyRelsToIgnored: dispatchProps.getRelsToIgnored.bind(null, stateProps.currentUserId),
      ignoreTlog: dispatchProps.cancelIgnoreTlog.bind(null, stateProps.currentUserId),
      unfollowFromMe: dispatchProps.unfollowFrom.bind(null, stateProps.currentUserId),
    },
    ownProps
  )
)(RelationManagerPopup);
