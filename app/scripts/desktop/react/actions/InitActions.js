export const INIT_SET_TLOG = 'INIT_SET_TLOG';

export function initTlog(tlog) {
  return {
    type: INIT_SET_TLOG,
    tlog,
    tlogId: tlog.id,
  };
}
