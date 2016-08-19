import React, { PropTypes } from 'react';
import FlowFormChooser from '../FlowForm/FlowFormChooser';
import FlowFormStaffs from '../FlowForm/FlowFormStaffs';

function Staffs({ addStaff, changeStaffRole, flowId, limit, removeStaff, staffs })  {
  function handleUserChoose(user) {
    addStaff(flowId, user.get('id'));
  }

  function handleStaffDelete(staff) {
    removeStaff(flowId, staff.getIn([ 'user', 'id' ]));
  }

  function handleStaffRoleChange(staff, role) {
    changeStaffRole(flowId, staff.getIn([ 'user', 'id' ]), role);
  }

  return (
    <div>
      <div className="flow-form__item">
        <FlowFormChooser
          limitReached={limit === staffs.count()}
          onChoose={handleUserChoose}
        />
      </div>
      <FlowFormStaffs
        onDelete={handleStaffDelete}
        onRoleChange={handleStaffRoleChange}
        staffs={staffs}
      />
    </div>
  );
}

Staffs.propTypes = {
  addStaff: PropTypes.func.isRequired,
  changeStaffRole: PropTypes.func.isRequired,
  flowId: PropTypes.number.isRequired,
  limit: PropTypes.number,
  removeStaff: PropTypes.func.isRequired,
  staffs: PropTypes.object.isRequired,
};

Staffs.defaultProps = {
  limit: 5,
};

export default Staffs;
