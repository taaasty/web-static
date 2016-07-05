/*global i18n */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  addStaff,
  removeStaff,
  changeStaffRole,
  updateFlow,
} from '../../actions/FlowActions';
import TabbedArea from '../Tabs/TabbedArea';
import TabPane from '../Tabs/TabPane';
import Staffs from './Staffs';
import Followers from './Followers';
import Ignored from './Ignored';
import Settings from './Settings';
import { List, Map } from 'immutable';

const emptyStaff = Map();

function FlowManager({ flow, staffs, updateFlow }) {
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
        <Staffs staffs={staffs} />
      </TabPane>
    </TabbedArea>
  );
    /*
      {renderRequested()}
      <TabPane count={followersCount} tab={i18n.t('manage_flow.tabs.followers')}>
        <Followers FlowActions={FlowActions} flow={flow.data} />
      </TabPane>
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
      staffs: state.entities.get('staff').filter((s) => s.get('flowId') === flowId).valueSeq(),
    };
  },
  { addStaff, changeStaffRole, removeStaff, updateFlow }
)(FlowManager);
