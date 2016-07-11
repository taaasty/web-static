/*global i18n */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateFlow } from '../../actions/FlowActions';
import {
  addStaff,
  removeStaff,
  changeStaffRole,
} from '../../actions/StaffActions';
import {
  approveTlog,
  declineTlog,
  unfollowFrom,
  ignoreTlog,
  cancelIgnoreTlog,
  REL_FRIEND_STATE,
  REL_IGNORED_STATE,
  REL_REQUESTED_STATE,
} from '../../actions/RelationshipActions';
import {
  getRelsByFriend,
  getRelsByRequested,
  getRelsToIgnored,
  RELS_BY_FRIEND,
  RELS_BY_REQUESTED,
  RELS_TO_IGNORED,
} from '../../actions/RelsActions';
import TabbedArea from '../Tabs/TabbedArea';
import TabPane from '../Tabs/TabPane';
import Staffs from './Staffs';
import Followers from './Followers';
import Ignored from './Ignored';
import Requested from './Requested';
import Settings from './Settings';
import { Map } from 'immutable';

const emptyUser = Map();
const emptyRelUser = Map();
const emptyRelState = Map();

class FlowManager extends Component {
  componentWillMount() {
    const { flow, flowId, getRelsByFriend, getRelsToIgnored, getRelsByRequested } = this.props;

    getRelsByFriend(flowId);
    getRelsToIgnored(flowId);
    if (flow.get('isPrivacy')) {
      getRelsByRequested(flowId);
    }
  }
  render() {
    const { getRelsByFriend, unfollowFrom, updateFlow } = this.props;
    const { addStaff, changeStaffRole, removeStaff } = this.props;
    const { flow, flowId, staffs } = this.props;
    const { followers, followersState, followersTotalCount } = this.props;
    const { cancelIgnoreTlog, getRelsToIgnored, ignoreTlog,
            ignored, ignoredState, ignoredTotalCount } = this.props;
    const { approveTlog, declineTlog, getRelsByRequested, requested,
            requestedState, requestedTotalCount } = this.props;

    return (
      <TabbedArea>
        <TabPane tab={i18n.t('manage_flow.tabs.settings')}>
          <Settings flow={flow.toJS()} updateFlow={updateFlow} />
        </TabPane>
        <TabPane count={staffs.count()} tab={i18n.t('manage_flow.tabs.staffs')}>
          <Staffs
            addStaff={addStaff}
            changeStaffRole={changeStaffRole}
            flowId={flowId}
            removeStaff={removeStaff}
            staffs={staffs}
          />
        </TabPane>
        {flow.get('isPrivacy') && (
           <TabPane count={requestedTotalCount} tab={i18n.t('manage_flow.tabs.requested')}>
             <Requested
               approveTlog={approveTlog}
               declineTlog={declineTlog}
               getRequested={getRelsByRequested.bind(null, flowId)}
               requested={requested}
               requestedState={requestedState}
             />
           </TabPane>
         )}
        <TabPane count={followersTotalCount} tab={i18n.t('manage_flow.tabs.followers')}>
          <Followers
            followers={followers}
            followersState={followersState}
            getFollowers={getRelsByFriend.bind(null, flowId)}
            unfollowFrom={unfollowFrom}
          />
        </TabPane>
        <TabPane count={ignoredTotalCount} tab={i18n.t('manage_flow.tabs.ignored')}>
          <Ignored
            cancelIgnoreTlog={cancelIgnoreTlog}
            getIgnored={getRelsToIgnored.bind(null, flowId)}
            ignoreTlog={ignoreTlog}
            ignored={ignored}
            ignoredState={ignoredState}
          />
        </TabPane>
      </TabbedArea>
    );
  }
}

FlowManager.propTypes = {
  addStaff: PropTypes.func.isRequired,
  cancelIgnoreTlog: PropTypes.func.isRequired,
  changeStaffRole: PropTypes.func.isRequired,
  flow: PropTypes.object.isRequired,
  flowId: PropTypes.number.isRequired,
  followers: PropTypes.object.isRequired,
  followersState: PropTypes.object.isRequired,
  followersTotalCount: PropTypes.number.isRequired,
  getRelsByFriend: PropTypes.func.isRequired,
  getRelsByRequested: PropTypes.func.isRequired,
  getRelsToIgnored: PropTypes.func.isRequired,
  ignoreTlog: PropTypes.func.isRequired,
  ignored: PropTypes.object.isRequired,
  ignoredState: PropTypes.object.isRequired,
  ignoredTotalCount: PropTypes.number.isRequired,
  removeStaff: PropTypes.func.isRequired,
  requested: PropTypes.object.isRequired,
  requestedState: PropTypes.object.isRequired,
  requestedTotalCount: PropTypes.number.isRequired,
  staffs: PropTypes.object.isRequired,
  unfollowFrom: PropTypes.func.isRequired,
  updateFlow: PropTypes.func.isRequired,
};

export default connect(
  (state, { flow }) => {
    const flowId = flow.get('id');

    const followers = state
      .entities
      .get('rel')
      .filter((r) => r.get('userId') === flowId && r.get('state') === REL_FRIEND_STATE)
      .sortBy((r) => r.get('position'))
      .map((r) => r.set('reader', state.entities.getIn([ 'tlog', String(r.get('readerId')) ], emptyRelUser)));
    const followersState = state.rels.get(RELS_BY_FRIEND, Map());
    const followersTotalCount = followersState.get('unloadedCount') + followers.count();

    const ignored = state
      .entities
      .get('rel')
      .filter((r) => r.get('readerId') === flowId && r.get('state') === REL_IGNORED_STATE)
      .sortBy((r) => r.get('position'))
      .map((r, relId) => r.set('', state.entities.getIn([ 'relState', relId ], emptyRelState)))
      .map((r) => r.set('user', state.entities.getIn([ 'tlog', String(r.get('userId')) ], emptyRelUser)));
    const ignoredState = state.rels.get(RELS_TO_IGNORED, Map());
    const ignoredTotalCount = ignoredState.get('unloadedCount') + ignored.count();

    const requested = state
      .entities
      .get('rel')
      .filter((r) => r.get('userId') === flowId && r.get('state') === REL_REQUESTED_STATE)
      .sortBy((r) => r.get('position'))
      .map((r, relId) => r.set('', state.entities.getIn([ 'relState', relId ], emptyRelState)))
      .map((r) => r.set('reader', state.entities.getIn([ 'tlog', String(r.get('readerId')) ], emptyRelUser)));
    const requestedState = state.rels.get(RELS_BY_REQUESTED, Map());
    const requestedTotalCount = requestedState.get('unloadedCount') + requested.count();
    

    return {
      flow,
      flowId,
      followers,
      followersState,
      followersTotalCount,
      ignored,
      ignoredState,
      ignoredTotalCount,
      requested,
      requestedState,
      requestedTotalCount,
      staffs: state
        .entities
        .get('staff')
        .filter((s) => s.get('flowId') === flowId)
        .map((s) => s.set('user', state.entities.getIn([ 'tlog', String(s.get('user')) ], emptyUser)))
        .valueSeq(),
    };
  },
  { addStaff, approveTlog, changeStaffRole, declineTlog,
    getRelsByFriend, getRelsByRequested, getRelsToIgnored,
    ignoreTlog, cancelIgnoreTlog,
    removeStaff, updateFlow, unfollowFrom }
)(FlowManager);
