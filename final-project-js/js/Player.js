import { sound } from './audio.js';

import scatterPlayer from './scatterPlayer.js';
import { drawCircle, coordinates } from './utility.js';

export default class Player {
  constructor(game) {
    this.game = game;
    this.playerInfo = this.game.playerInfo;
    this.init();
  }

  init() {
    if (!this.game.gameOver) {
      if (this.game.clicked) {
        sound.tapSound.play();
        this.playerInfo.playerSpeed = this.playerInfo.maxPlayerSpeed;

        if (this.playerInfo.acceleration == 0) {
          this.playerInfo.playerSpeed *= 1.2;
          this.playerInfo.acceleration = -0.3;
        }
      }

      this.playerInfo.playerSpeed = Math.max(
        this.playerInfo.playerSpeed + this.playerInfo.acceleration,
        -this.playerInfo.maxPlayerSpeed
      );

      this.playerInfo.posy = Math.max(
        this.playerInfo.posy + this.playerInfo.playerSpeed,
        this.playerInfo.posy1
      );

      if (this.playerInfo.posy < this.game.topY) {
        scatterPlayer(this.game);
      }

      drawCircle(
        coordinates(
          this.playerInfo.posx,
          this.playerInfo.posy,
          this.game.gameCanvasHeight,
          this.game.topY
        ),
        this.playerInfo.radius,
        this.playerInfo.color,
        this.game
      );
    }
  }
}
