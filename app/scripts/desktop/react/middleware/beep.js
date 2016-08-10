import Beep from '../../../shared/react/services/Beep';

export const BEEP = Symbol('Play beep sound');

export default (store) => (next) => (action) => {
  const beepAction = action[BEEP];
  if (typeof beepAction === 'undefined') {
    return next(action);
  }

  const { src } = beepAction;

  if (typeof beepAction !== 'string') {
    throw new Error('Beep action should contain `src` string field');
  }

  try {
    Beep.play(src);
  } catch (e) {
    console.error('Beep error: ', e);
  }

  const nextAction = Object.assign({}, action);
  delete nextAction[BEEP];

  return next(nextAction);
};
