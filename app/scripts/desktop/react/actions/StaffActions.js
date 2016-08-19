import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { deleteOpts, postOpts, putOpts } from './reqHelpers';

export const STAFF_ADD_REQUEST = 'STAFF_ADD_REQUEST';
export const STAFF_ADD_SUCCESS = 'STAFF_ADD_SUCCESS';
export const STAFF_ADD_FAILURE = 'STAFF_ADD_FAILURE';

export const STAFF_DELETE_REQUEST = 'STAFF_DELETE_REQUEST';
export const STAFF_DELETE_SUCCESS = 'STAFF_DELETE_SUCCESS';
export const STAFF_DELETE_FAILURE = 'STAFF_DELETE_FAILURE';

export const STAFF_CHANGE_REQUEST = 'STAFF_CHANGE_REQUEST';
export const STAFF_CHANGE_SUCCESS = 'STAFF_CHANGE_SUCCESS';
export const STAFF_CHANGE_FAILURE = 'STAFF_CHANGE_FAILURE';

export function addStaff(flowId, userId) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.flowStaffs(flowId),
      schema: Schemas.STAFF,
      types: [ STAFF_ADD_REQUEST, STAFF_ADD_SUCCESS, STAFF_ADD_FAILURE ],
      opts: postOpts({ userId }),
    },
    flowId,
    userId,
  };
}

export function removeStaff(flowId, userId) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.flowStaffs(flowId),
      schema: Schemas.STAFF,
      types: [ STAFF_DELETE_REQUEST, STAFF_DELETE_SUCCESS, STAFF_DELETE_FAILURE ],
      opts: deleteOpts({ userId }),
    },
    flowId,
    userId,
  };
}

export function changeStaffRole(flowId, userId, role) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.flowStaffs(flowId),
      schema: Schemas.STAFF,
      types: [ STAFF_CHANGE_REQUEST, STAFF_CHANGE_SUCCESS, STAFF_CHANGE_FAILURE ],
      opts: putOpts({ userId, role }),
    },
    flowId,
    userId,
  };
}
