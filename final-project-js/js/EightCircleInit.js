import Obstacle from './Obstacle.js';
import { getColor } from './colors.js';
import { getDistanceAngle, coordinates } from './utility.js';

export default class EightCircleInit {
  constructor(game, angle, direction, color) {
    this.game = game;
    this.colorIndex = color;
    this.playerInfo = this.game.playerInfo;

    //create new obstacle instance
    this.circle = new Obstacle(
      this.game.gameCanvasWidth / 2,
      100 + this.game.obstacles.posY * this.game.obstacles.number,
      10,
      getColor(this.colorIndex),
      this.game
    );

    //for changing posx and posy
    this.circle.posx1 = this.circle.posx;
    this.circle.posy1 = this.circle.posy;
    this.circle.radian = 80;

    //add angle and direction for circle
    this.circle.angle = angle;
    this.circle.direction = direction;

    //add additional circle props
    this.addCircleProps();
  }

  addCircleProps() {
    this.circle.move = () => {
      this.circle.posx =
        this.circle.posx1 +
        1.5 * this.circle.radian * Math.cos(this.circle.angle);
      this.circle.posy =
        this.circle.posy1 +
        0.7 * this.circle.radian * Math.sin(2 * this.circle.angle);
      this.circle.angle += this.circle.direction * 0.02;
    };
  }
}
