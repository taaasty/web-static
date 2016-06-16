import ApiRoutes from '../../../shared/routes/api';
import ApiHelpers from '../../../shared/helpers/api';
import { CALL_API, Schemas } from '../middleware/api';
import { defaultOpts, deleteOpts, postOpts, putOpts } from './reqHelpers';

export const FLOW_VIEW_STYLE = 'FLOW_VIEW_STYLE';

export function flowViewStyle(style) {
  return {
    type: FLOW_VIEW_STYLE,
    style,
  };
}

export const FLOW_REQUEST = 'FLOW_REQUEST';
export const FLOW_SUCCESS = 'FLOW_SUCCESS';
export const FLOW_FAILURE = 'FLOW_FAILURE';

function fetchFlow(flowId) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.flow(flowId),
      schema: Schemas.FLOW,
      types: [ FLOW_REQUEST, FLOW_SUCCESS, FLOW_FAILURE ],
      opts: defaultOpts,
    },
    flowId,
  };
}

export function getFlow(flowId, requiredFields=[]) {
  return (dispatch, getState) => {
    const { flow: flowState, entities } = getState();
    const flow = entities.getIn([ 'flow', flowId.toString() ]);

    if (flow && requiredFields.every((key) => flow.has(key))) {
      return null;
    }
    
    return !flowState.isFetching && dispatch(fetchFlow(flowId));
  };
}

export function updateFlow(flowId, { name, slug, title, picFile, isPrivacy, isPremoderate }) {
  const formData = ApiHelpers.prepareFormData({
    name, slug, title, is_privacy: isPrivacy, is_premoderate: isPremoderate, flowpic: picFile,
  });

  return {
    [CALL_API]: {
      endpoint: ApiRoutes.folw(flowId),
      schema: Schemas.FLOW,
      types: [ FLOW_REQUEST, FLOW_SUCCESS, FLOW_FAILURE ],
      opts: putOpts(formData),
    },
    flowId,
  };
}

export function addStaff(flowId, userId) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.flowStaffs(flowId),
      schema: Schemas.STAFF,
      types: [ FLOW_REQUEST, FLOW_SUCCESS, FLOW_FAILURE ],
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
      types: [ FLOW_REQUEST, FLOW_SUCCESS, FLOW_FAILURE ],
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
      types: [ FLOW_REQUEST, FLOW_SUCCESS, FLOW_FAILURE ],
      opts: putOpts({ userId, role }),
    },
    flowId,
    userId,
  };
}

export function loadAvailableFlows(data) {
  return Api.flow.loadAvailable(data);
}
