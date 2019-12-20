import EightCircleInit from './EightCircleInit.js';

import { randomValue } from './utility.js';

export default class EightCircleShape {
  constructor(game) {
    this.game = game;
    this.direction = randomValue(-1, 1);
    
    this.init();
  }

  init() {
    for (let i = 0; i < Math.PI * 2; i += (Math.PI * 2) / 20) {
      
      new EightCircleInit(
        this.game,
        i,
        this.direction,
        Math.floor(8 * (i / (Math.PI * 2)))
      );
    }
  }
}
