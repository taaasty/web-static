/*global i18n */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as FlowActions from '../../actions/FlowActions';
import TabbedArea from '../Tabs/TabbedArea';
import TabPane from '../Tabs/TabPane';
import Staffs from './Staffs';
import Followers from './Followers';
import Ignored from './Ignored';
import Settings from './Settings';

function FlowManager({ FlowActions, flow }) {
  const { data: { staffs }, followersCount, ignoredCount } = flow;

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
        <Settings FlowActions={FlowActions} flow={flow.data} />
      </TabPane>
      <TabPane count={staffs.length} tab={i18n.t('manage_flow.tabs.staffs')}>
        <Staffs
          FlowActions={FlowActions}
          staffs={staffs}
        />
      </TabPane>
      {renderRequested()}
      <TabPane count={followersCount} tab={i18n.t('manage_flow.tabs.followers')}>
        <Followers FlowActions={FlowActions} flow={flow.data} />
      </TabPane>
      <TabPane count={ignoredCount} tab={i18n.t('manage_flow.tabs.ignored')}>
        <Ignored FlowActions={FlowActions} flow={flow.data} />
      </TabPane>
    </TabbedArea>
  );
}

FlowManager.propTypes = {
  FlowActions: PropTypes.object.isRequired,
  flow: PropTypes.shape({
    data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      staffs: PropTypes.array.isRequired,
      flowpic: PropTypes.object.isRequired,
      tlog_url: PropTypes.string.isRequired,
    }).isRequired,
    followersCount: PropTypes.number,
    ignoredCount: PropTypes.number,
    requestedCount: PropTypes.number,
  }).isRequired,
};

export default connect(
  null,
  (dispatch) => ({ FlowActions: bindActionCreators(FlowActions, dispatch) })
)(FlowManager);
