import Obstacle from './Obstacle.js';
import { randomColor } from './colors.js';
import { randomRange } from './utility.js';

export default class Particle {
  constructor(game) {
    this.game = game;
    this.playerInfo = this.game.playerInfo;

    this.newParticle = new Obstacle(
      this.playerInfo.posx,
      this.playerInfo.posy,
      5,
      randomColor(),
      this.game
    );

    //add new particle props
    this.addNewParticleProps();
  }

  addNewParticleProps() {
    this.newParticle.gravity = 0.6;
    this.newParticle.horizontalSpeed = randomRange(-10, 10);
    this.newParticle.verticalSpeed = randomRange(10, 20);

    this.newParticle.move = () => {
      this.newParticle.verticalSpeed -= this.newParticle.gravity;
      this.newParticle.posx += this.newParticle.horizontalSpeed;
      this.newParticle.posy += this.newParticle.verticalSpeed;

      // debugger;
      //this will avoid particle going out of canvas
      if (
        this.newParticle.posx < 0 ||
        this.newParticle.posx > this.game.gameCanvasWidth
      ) {
        //if particles touch left and right boundary of canvas
        this.newParticle.horizontalSpeed *= -1;
      }

      if (this.newParticle.posy < this.game.topY) {
        //remove this from obstacles array
        this.newParticle.destroy();
      }
    };
  }
}
