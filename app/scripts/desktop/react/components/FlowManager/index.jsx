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
  unfollowFrom,
  REL_FRIEND_STATE,
  REL_IGNORED_STATE,
} from '../../actions/RelationshipActions';
import {
  getRelsByFriend,
  RELS_BY_FRIEND,
  RELS_TO_IGNORED,
} from '../../actions/RelsActions';
import TabbedArea from '../Tabs/TabbedArea';
import TabPane from '../Tabs/TabPane';
import Staffs from './Staffs';
import Followers from './Followers';
import Ignored from './Ignored';
import Settings from './Settings';
import { Map } from 'immutable';

const emptyUser = Map();
const emptyRelUser = Map();

class FlowManager extends Component {
  componentWillMount() {
    const { flowId, getRelsByFriend } = this.props;

    getRelsByFriend(flowId);
  }
  renderRequested() {
    return false;
    // if (!flow.data.is_privacy) {
    //   return (
    //     <TabPane count={requestedCount} tab={i18n.t('manage_flow.tabs.requested')}>
    //       <FlowManagerRequests flow={flow.data} />
    //     </TabPane>
    //   );
    // }
  }
  render() {
    const { getRelsByFriend, unfollowFrom, updateFlow } = this.props;
    const { addStaff, changeStaffRole, removeStaff } = this.props;
    const { flow, flowId, staffs } = this.props;
    const { followers, followersState, followersTotalCount } = this.props;

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
        {this.renderRequested()}
        <TabPane count={followersTotalCount} tab={i18n.t('manage_flow.tabs.followers')}>
          <Followers
            followers={followers}
            followersState={followersState}
            getFollowers={getRelsByFriend.bind(null, flowId)}
            unfollowFrom={unfollowFrom}
          />
        </TabPane>
      </TabbedArea>
    );
    /*
       <TabPane count={ignoredCount} tab={i18n.t('manage_flow.tabs.ignored')}>
       <Ignored FlowActions={FlowActions} flow={flow.data} />
       </TabPane>
       </TabbedArea>
       );
     */
  }
}

FlowManager.propTypes = {
  addStaff: PropTypes.func.isRequired,
  changeStaffRole: PropTypes.func.isRequired,
  flow: PropTypes.object.isRequired,
  flowId: PropTypes.number.isRequired,
  followers: PropTypes.object.isRequired,
  followersState: PropTypes.object.isRequired,
  followersTotalCount: PropTypes.number.isRequired,
  getRelsByFriend: PropTypes.func.isRequired,
  ignored: PropTypes.object.isRequired,
  removeStaff: PropTypes.func.isRequired,
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
      .filter((r) => r.get('userId') === flowId && r.get('state') === REL_IGNORED_STATE)
      .sortBy((r) => r.get('position'))
      .map((r) => r.set('user', state.entities.getIn([ 'tlog', String(r.get('userId')) ], emptyRelUser)));

    return {
      flow,
      flowId,
      followers,
      followersState,
      followersTotalCount,
      ignored,
      staffs: state
        .entities
        .get('staff')
        .filter((s) => s.get('flowId') === flowId)
        .map((s) => s.set('user', state.entities.getIn([ 'tlog', String(s.get('user')) ], emptyUser)))
        .valueSeq(),
    };
  },
  { addStaff, changeStaffRole, getRelsByFriend,
    removeStaff, updateFlow, unfollowFrom }
)(FlowManager);
