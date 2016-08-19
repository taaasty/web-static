import { Schemas } from '../middleware/api';
import { NORMALIZE_DATA } from '../middleware/normalize';

export const INIT_SET_TLOG = 'INIT_SET_TLOG';
export const INIT_CURRENT_USER = 'INIT_CURRENT_USER';
export const INIT_TLOG_ENTRY = 'INIT_TLOG_ENTRY';
export const INIT_FLOW = 'INIT_FLOW';

export function initCurrentUser(user) {
  return {
    type: INIT_CURRENT_USER,
    user,
  };
}

export function initTlog(data) {
  return {
    [NORMALIZE_DATA]: {
      schema: Schemas.TLOG,
      type: INIT_SET_TLOG,
      data,
    },
  };
}

export function initTlogEntry(data) {
  return {
    [NORMALIZE_DATA]: {
      schema: Schemas.ENTRY,
      type: INIT_TLOG_ENTRY,
      data,
    },
  };
}

export function initFlow(data) {
  return {
    [NORMALIZE_DATA]: {
      schema: Schemas.FLOW,
      type: INIT_FLOW,
      data,
    },
  };
}
