/*global i18n */
import React, { Component, PropTypes } from 'react';
import TabbedArea from '../Tabs/TabbedArea';
import TabPane from '../Tabs/TabPane';
import PanelFollowings from './PanelFollowings';
import PanelFollowers from './PanelFollowers';
import PanelRequested from './PanelRequested';
import PanelIgnored from './PanelIgnored';
import PanelSocial from './PanelSocial';
import SignInVk from './SignInVk';
import SignInFb from './SignInFb';
import Popup from '../Popup';
import { connect } from 'react-redux';
import {
  getRelsByFriend,
  getRelsToFriend,
  getRelsByRequested,
  getRelsToIgnored,
  getRelsVkSuggested,
  getRelsFbSuggested,
  subscribeAllVk,
  subscribeAllFb,
  RELS_TO_FRIEND,
  RELS_TO_IGNORED,
  RELS_BY_FRIEND,
  RELS_BY_REQUESTED,
  RELS_VK_SUGGESTED,
  RELS_FB_SUGGESTED,
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
import { Map, List } from 'immutable';

const emptyRel = Map();
const emptyRelUser = Map();
const emptyRelState = Map();
const PROVIDER_VK = 'vkontakte';
const PROVIDER_FB = 'facebook';

class RelationManagerPopup extends Component {
  componentWillMount() {
    const { getMyRelsByFriend, getMyRelsByRequested, getMyRelsToIgnored,
            getMyRelsToFriend, getRelsVkSuggested, getRelsFbSuggested } = this.props;

    getMyRelsToFriend();
    getMyRelsByFriend();
    getMyRelsByRequested();
    getMyRelsToIgnored();
    getRelsVkSuggested();
    getRelsFbSuggested();
  }

  /*
     subscribe all request

     url: ApiRoutes.suggestions_vkontakte(),
     method: 'POST',
   */
  render() {
    const { isPrivacy, onClose } = this.props;
    const { followingsTotalCount, followings, followingsState, getMyRelsToFriend } = this.props;
    const { followersTotalCount, followers, followersState, getMyRelsByFriend, unfollowFromMe } = this.props;
    const { approveTlog, declineTlog, requestedTotalCount, requested, requestedState, getMyRelsByRequested } = this.props;
    const { cancelIgnoreTlog, getMyRelsToIgnored, ignoreTlog, ignoredTotalCount, ignored, ignoredState } = this.props;
    const { hasVkAuth, suggestionsVk, suggestionsVkState, subscribeAllVk } = this.props;
    const { hasFbAuth, suggestionsFb, suggestionsFbState, subscribeAllFb } = this.props;

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
          <TabPane count={suggestionsVk.count()} tab={i18n.t('persons_popup.menu.vkontakte')}>
            {hasVkAuth ? (
              <PanelSocial
                emptyMsg={i18n.t('vkontakte_suggestions_empty')}
                relations={suggestionsVk}
                relationsState={suggestionsVkState}
                subscribeAll={subscribeAllVk}
                subscribeAllButtonText={i18n.t('vkontakte_subscribe_all_button')}
                totalCount={suggestionsVk.count()}
              />)
              : <SignInVk />
            }
          </TabPane>
          <TabPane count={suggestionsFb.count()} tab={i18n.t('persons_popup.menu.facebook')}>
            {hasFbAuth ? (
               <PanelSocial
                 emptyMsg={i18n.t('facebook_suggestions_empty')}
                 relations={suggestionsFb}
                 relationsState={suggestionsFbState}
                 subscribeAll={subscribeAllFb}
                 subscribeAllButtonText={i18n.t('facebook_subscribe_all_button')}
                 totalCount={suggestionsFb.count()}
               />)
             : <SignInFb />
            }
          </TabPane>
        </TabbedArea>
      </Popup>
    );
  }
}

RelationManagerPopup.propTypes = {
  approveTlog: PropTypes.func.isRequired,
  cancelIgnoreTlog: PropTypes.func.isRequired,
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
  getMyRelsToIgnored: PropTypes.func.isRequired,
  getRelsFbSuggested: PropTypes.func.isRequired,
  getRelsVkSuggested: PropTypes.func.isRequired,
  hasVkAuth: PropTypes.bool.isRequired,
  ignoreTlog: PropTypes.func.isRequired,
  ignored: PropTypes.object.isRequired,
  ignoredState: PropTypes.object.isRequired,
  ignoredTotalCount: PropTypes.number.isRequired,
  isPrivacy: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  requested: PropTypes.object.isRequired,
  requestedState: PropTypes.object.isRequired,
  requestedTotalCount: PropTypes.number.isRequired,
  subscribeAllFb: PropTypes.func.isRequired,
  subscribeAllVk: PropTypes.func.isRequired,
  suggestionsVk: PropTypes.object.isRequired,
  suggestionsVkState: PropTypes.object.isRequired,
  unfollowFromMe: PropTypes.func.isRequired,
};

export default connect(
  (state) => {
    const currentUserId = state.currentUser.data.id;
    const hasVkAuth = state.currentUser.data.authentications &&
                      !!state.currentUser.data.authentications.filter((a) => a.provider === PROVIDER_VK && a.id).length;
    const hasFbAuth = state.currentUser.data.authentications &&
                      !!state.currentUser.data.authentications.filter((a) => a.provider === PROVIDER_FB && a.id).length;
    
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

    const suggestionsVkState = state.rels.get(RELS_VK_SUGGESTED);
    const suggestionsVk = suggestionsVkState
      .get('data', List())
      .toMap()
      .mapEntries(([ key, relId ]) => [ relId, state.entities.getIn([ 'rel', relId ], emptyRel) ])
      .map((r) => r.set('user', state.entities.getIn([ 'tlog', String(r.get('userId')) ], emptyRelUser)));

    const suggestionsFbState = state.rels.get(RELS_FB_SUGGESTED);
    const suggestionsFb = suggestionsFbState
      .get('data', List())
      .toMap()
      .mapEntries(([ key, relId ]) => [ relId, state.entities.getIn([ 'rel', relId ], emptyRel) ])
      .map((r) => r.set('user', state.entities.getIn([ 'tlog', String(r.get('userId')) ], emptyRelUser)));
                         

    return {
      currentUserId,
      hasVkAuth,
      hasFbAuth,
      isPrivacy: !!state.currentUser.data.isPrivacy,
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
      suggestionsVk,
      suggestionsVkState,
      suggestionsFb,
      suggestionsFbState,
    };
  },
  { approveTlog, cancelIgnoreTlog, declineTlog, getRelsByFriend,
    getRelsByRequested, getRelsToFriend, getRelsToIgnored,
    getRelsVkSuggested, getRelsFbSuggested, ignoreTlog,
    subscribeAllVk, subscribeAllFb, unfollowFrom },
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
      getRelsVkSuggested: dispatchProps.getRelsVkSuggested,
      getRelsFbSuggested: dispatchProps.getRelsFbSuggested,
      ignoreTlog: dispatchProps.cancelIgnoreTlog.bind(null, stateProps.currentUserId),
      subscribeAllVk: dispatchProps.subscribeAllVk,
      subscribeAllFb: dispatchProps.subscribeAllFb,
      unfollowFromMe: dispatchProps.unfollowFrom.bind(null, stateProps.currentUserId),
    },
    ownProps
  )
)(RelationManagerPopup);
