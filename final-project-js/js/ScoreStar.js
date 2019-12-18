import Obstacle from './Obstacle.js';

import { getDistanceAngle, drawStar } from './utility.js';

export default class ScoreStar {
  constructor(game) {
    this.game = game;
    this.ctx = this.game.ctx;
    this.playerInfo = this.game.playerInfo;
    this.star = new Obstacle(
      this.game.gameCanvasWidth / 2,
      100 + this.game.obstacles.posY * this.game.obstacles.number,
      15,
      '#DDDDDD',
      this.game
    );
    //add star properties
    this.addStarProps();
  }

  addStarProps() {
    this.star.score = 1;
    this.star.angle = 0;
    this.star.radius1 = this.star.radius;

    this.star.move = () => {
      // check player and star collison and increase score if collided
      if (
        getDistanceAngle(
          { x: this.star.posx, y: this.star.posy },
          { x: this.playerInfo.posx, y: this.playerInfo.posy }
        ).distance < this.star.radius
      ) {
        sound.scoreSound.play();
        this.game.score += this.star.score;
        this.star.destroy();
      }
      this.star.radius =
        this.star.radius1 +
        1.2 * Math.sin((this.star.angle++ / 180) * Math.PI * 4);
    };

    //draw star shape
    this.star.draw = () => {
      drawStar(
        this.star.posx,
        this.star.posy,
        this.star.radius,
        0,
        this.star.color,
        1,
        this.star.score,
        this.game
      );
    };
  }
}
