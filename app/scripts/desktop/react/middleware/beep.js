import Beep from '../../../shared/react/services/Beep';

export const BEEP = Symbol('Play beep sound');

export default (store) => (next) => (action) => {
  const beepAction = action[BEEP];
  if (typeof beepAction === 'undefined' || !beepAction.src) {
    return next(action);
  }

  try {
    Beep.play(beepAction.src);
  } catch (e) {
    console.error('Beep error: ', e);
  }

  const nextAction = Object.assign({}, action);
  delete nextAction[BEEP];

  return next(nextAction);
};
