import React, { PropTypes } from 'react';
import FlowFormChooser from '../FlowForm/FlowFormChooser';
import FlowFormStaffs from '../FlowForm/FlowFormStaffs';

function Staffs({ FlowActions, limit, staffs })  {
  function handleUserChoose(user) {
    FlowActions.addStaff(user.id);
  }

  function handleStaffDelete(staff) {
    FlowActions.removeStaff(staff.user.id);
  }

  function handleStaffRoleChange(staff, role) {
    FlowActions.changeStaffRole(staff.user.id, role);
  }

  return (
    <div>
      <div className="flow-form__item">
        <FlowFormChooser
          limitReached={limit === staffs.length}
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
  FlowActions: PropTypes.object.isRequired,
  limit: PropTypes.number,
  staffs: PropTypes.array.isRequired,
};

Staffs.defaultProps = {
  limit: 5,
};

export default Staffs;
