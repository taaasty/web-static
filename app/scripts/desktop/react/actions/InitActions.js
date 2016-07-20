export const INIT_SET_TLOG = 'INIT_SET_TLOG';
export const INIT_CURRENT_USER = 'INIT_CURRENT_USER';

export function initTlog(tlog) {
  return {
    type: INIT_SET_TLOG,
    tlog,
    tlogId: tlog.id,
  };
}

export function initCurrentUser(user) {
  return {
    type: INIT_CURRENT_USER,
    user,
  };
}
