import React, {Component, PropTypes} from 'react';
import FlowActionCreators from '../../actions/Flow';
import FlowFormChooser from '../FlowForm/FlowFormChooser';
import FlowFormStaffs from '../FlowForm/FlowFormStaffs';

export default class FlowManagerStaffs {
  static propTypes = {
    flowID: PropTypes.number.isRequired,
    staffs: PropTypes.array.isRequired,
    staffsLimit: PropTypes.number,
    onUpdate: PropTypes.func.isRequired,
  };
  static defaultProps = {
    staffsLimit: 5,
  };
  render() {
    return (
      <div>
        <div className="flow-form__item">
          <FlowFormChooser
              limitReached={this.props.staffsLimit === this.props.staffs.length}
              onChoose={this.handleUserChoose.bind(this)} />
        </div>
        <FlowFormStaffs
            staffs={this.props.staffs}
            onDelete={this.handleStaffDelete.bind(this)}
            onRoleChange={this.handleStaffRoleChange.bind(this)} />
      </div>
    );
  }
  handleUserChoose(user) {
    FlowActionCreators.addStaff(this.props.flowID, user.id)
      .then((staff) => {
        let newStaff = this.props.staffs.concat(staff);
        this.props.onUpdate(newStaff);
      });
  }
  handleStaffDelete(staff) {
    FlowActionCreators.removeStaff(this.props.flowID, staff.user.id)
      .then((staff) => {
        let newStaff = this.props.staffs.filter((item) => item.user.id !== staff.user.id);
        this.props.onUpdate(newStaff);
      });
  }
  handleStaffRoleChange(staff, role) {
    FlowActionCreators.changeStaffRole(this.props.flowID, staff.user.id, role)
      .then((staff) => {
        this.props.staffs.forEach((item) => {
          if (item.user.id === staff.user.id) item.role = role;
        });
        this.props.onUpdate(this.props.staffs);
      });
  }
}
