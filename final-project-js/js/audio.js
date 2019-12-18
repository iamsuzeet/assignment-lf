const COLOR_S = new Audio();
COLOR_S.src = '../sounds/colorswitch.wav';

const SCORE_S = new Audio();
SCORE_S.src = '../sounds/scorestar.wav';

const TAP_S = new Audio();
TAP_S.src = '../sounds/tapJump.wav';

const DEAD_S = new Audio();
DEAD_S.src = '../sounds/dead.wav';

export const sound = {
  switchSound: COLOR_S,
  scoreSound: SCORE_S,
  tapSound: TAP_S,
  deadSound: DEAD_S
};
