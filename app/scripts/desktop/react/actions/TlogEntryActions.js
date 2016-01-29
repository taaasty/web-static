export const TLOG_ENTRY_SET = 'TLOG_ENTRY_SET';

export function tlogEntrySet(data) {
  return {
    type: TLOG_ENTRY_SET,
    payload: data,
  };
};
