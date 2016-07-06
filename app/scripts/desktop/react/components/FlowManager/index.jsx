/*global i18n */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateFlow } from '../../actions/FlowActions';
import {
  addStaff,
  removeStaff,
  changeStaffRole,
} from '../../actions/StaffActions';
import TabbedArea from '../Tabs/TabbedArea';
import TabPane from '../Tabs/TabPane';
import Staffs from './Staffs';
import Followers from './Followers';
import Ignored from './Ignored';
import Settings from './Settings';
import { List, Map } from 'immutable';

const emptyStaff = Map();
const emptyUser = Map();

function FlowManager({ addStaff, changeStaffRole, flow, removeStaff, staffs, updateFlow }) {
  function renderRequested() {
    return false;
    // if (!flow.data.is_privacy) {
    //   return (
    //     <TabPane count={requestedCount} tab={i18n.t('manage_flow.tabs.requested')}>
    //       <FlowManagerRequests flow={flow.data} />
    //     </TabPane>
    //   );
    // }
  }

  return (
    <TabbedArea>
      <TabPane tab={i18n.t('manage_flow.tabs.settings')}>
        <Settings flow={flow.toJS()} updateFlow={updateFlow} />
      </TabPane>
      <TabPane count={staffs.count()} tab={i18n.t('manage_flow.tabs.staffs')}>
        <Staffs
          addStaff={addStaff}
          changeStaffRole={changeStaffRole}
          flowId={flow.get('id')}
          removeStaff={removeStaff}
          staffs={staffs}
        />
      </TabPane>
      {renderRequested()}
      <TabPane count={flow.get('followersCount', 0)} tab={i18n.t('manage_flow.tabs.followers')}>
        <Followers flow={flow} />
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

FlowManager.propTypes = {
  addStaff: PropTypes.func.isRequired,
  changeStaffRole: PropTypes.func.isRequired,
  flow: PropTypes.object.isRequired,
  removeStaff: PropTypes.func.isRequired,
  staffs: PropTypes.object.isRequired,
  updateFlow: PropTypes.func.isRequired,
};

export default connect(
  (state, { flow }) => {
    const flowId = flow.get('id');

    return {
      flow,
      staffs: state
        .entities
        .get('staff')
        .filter((s) => s.get('flowId') === flowId)
        .map((s) => s.set('user', state.entities.getIn([ 'tlog', String(s.get('user')) ], emptyUser)))
        .valueSeq(),
    };
  },
  { addStaff, changeStaffRole, removeStaff, updateFlow }
)(FlowManager);
