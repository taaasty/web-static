import ApiRoutes from '../../../shared/routes/api';
import ApiHelpers from '../../../shared/helpers/api';
import { CALL_API, Schemas } from '../middleware/api';
import { defaultOpts, postOpts, putOpts } from './reqHelpers';
import { decamelizeKeys } from 'humps';

export const FLOW_REQUEST = 'FLOW_REQUEST';
export const FLOW_SUCCESS = 'FLOW_SUCCESS';
export const FLOW_FAILURE = 'FLOW_FAILURE';

export const FLOW_VIEW_STYLE = 'FLOW_VIEW_STYLE';

export function flowViewStyle(style) {
  return {
    type: FLOW_VIEW_STYLE,
    style,
  };
}

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
      endpoint: ApiRoutes.flow(flowId),
      schema: Schemas.FLOW,
      types: [ FLOW_REQUEST, FLOW_SUCCESS, FLOW_FAILURE ],
      opts: putOpts(formData),
    },
    flowId,
  };
}

export function createFlow(data) { // { name, title, flowpic, staffIds }
  const formData = ApiHelpers.prepareFormData(decamelizeKeys(data));

  return {
    [CALL_API]: {
      endpoint: ApiRoutes.flows(),
      schema: Schemas.FLOW,
      types: [ FLOW_REQUEST, FLOW_SUCCESS, FLOW_FAILURE ],
      opts: postOpts(formData),
    },
  };
}
