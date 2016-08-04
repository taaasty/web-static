export const MSG_UPDATE_MESSAGING_STATUS = 'MSG_UPDATE_MESSAGING_STATUS';

export function updateMessagingStatus(status) {
  return {
    type: MSG_UPDATE_MESSAGING_STATUS,
    status,
  };
}
