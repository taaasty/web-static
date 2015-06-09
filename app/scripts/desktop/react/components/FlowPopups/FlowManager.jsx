import React, {PropTypes, Component} from 'react';
import TabbedArea from '../Tabs/TabbedArea';
import TabPane from '../Tabs/TabPane';
import FlowManagerFollowers from './FlowManagerFollowers';
import FlowManagerIgnored from './FlowManagerIgnored';
import FlowManagerSettings from './FlowManagerSettings';

export default class FlowManager extends Component {
  static propTypes = {
    flow: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      staffs: PropTypes.array.isRequired,
      flowpic: PropTypes.object.isRequired,
      tlog_url: PropTypes.string.isRequired
    }).isRequired,
    onUpdate: PropTypes.func.isRequired
  }
  state = {
    flow: this.props.flow,
    followersCount: null,
    ignoredCount: null
  }
  render() {
    return (
      <TabbedArea>
        <TabPane tab="Настройки">
          <FlowManagerSettings
              flow={this.state.flow}
              onUpdate={this.updateFlow.bind(this)}
              onStaffsUpdate={this.updateStaffs.bind(this)} />
        </TabPane>
        {this.renderRequested()}
        <TabPane tab="Подписчики" count={this.state.followersCount}>
          <FlowManagerFollowers
              flow={this.state.flow}
              onCountUpdate={this.updateCount.bind(this, 'followersCount')} />
        </TabPane>
        <TabPane tab="Заблокированные" count={this.state.ignoredCount}>
          <FlowManagerIgnored
              flow={this.state.flow}
              onCountUpdate={this.updateCount.bind(this, 'ignoredCount')} />
        </TabPane>
      </TabbedArea>
    );
  }
  updateFlow(flow) {
    this.setState({flow});
    this.props.onUpdate(flow);
  }
  updateStaffs(staffs) {
    this.state.flow.staffs = staffs;
    this.props.onUpdate(this.state.flow);
  }
  updateCount(rel, count) {
    this.setState({[rel]: count});
  }
  renderRequested() {
    return false;
    // if (!this.props.flow.is_privacy) {
    //   return (
    //     <TabPane tab="Заявки" count={this.state.requestedCount}>
    //       <FlowManagerRequests flow={this.props.flow} />
    //     </TabPane>
    //   );
    // }
  }
}