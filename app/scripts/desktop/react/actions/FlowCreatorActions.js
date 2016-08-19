export const FLOW_CREATOR_SET = 'FLOW_CREATOR_SET';
export const FLOW_CREATOR_RESET = 'FLOW_CREATOR_RESET';
export const FLOW_CREATOR_ADD_STAFF = 'FLOW_CREATOR_ADD_STAFF';
export const FLOW_CREATOR_REMOVE_STAFF = 'FLOW_CREATOR_REMOVE_STAFF';

export function flowCreatorSet(key, value) {
  return {
    type: FLOW_CREATOR_SET,
    key,
    value,
  };
}

export function flowCreatorReset() {
  return {
    type: FLOW_CREATOR_RESET,
  };
}

export function flowCreatorAddStaff(user, role) {
  return {
    type: FLOW_CREATOR_ADD_STAFF,
    user,
    role,
  };
}

export function flowCreatorRemoveStaff(staff) {
  return {
    type: FLOW_CREATOR_REMOVE_STAFF,
    staff,
  };
}
