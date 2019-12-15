import Obstacle from './Obstacle.js';
import { coordinates, modAngle } from './utility.js';
import { getColor } from './colors.js';

export default class CircleObstacle {
  constructor(game, radius, speed, direction) {
    this.game = game;
    this.ctx = this.game.ctx;
    this.defaultSpeed = this.game.defaultSpeed;
    this.obstacles = this.game.obstacles;
    this.obstaclesArr = this.game.obstaclesArr;
    this.radius = radius;
    this.speed = speed;
    this.direction = direction;

    this.circle = new Obstacle(
      this.game.gameCanvasWidth / 2,
      100 + this.obstacles.posY * this.obstacles.number,
      this.radius,
      Math.floor(4 * Math.random()),
      this.game
    );

    this.addCircleProps();
  }

  addCircleProps() {
    this.circle.angle = Math.PI * 2 * Math.floor(4 * Math.random());
    this.circle.speed = this.direction * this.defaultSpeed * this.speed;
    this.circle.width = (this.circle.radius * 15) / 100;

    this.circle.draw = () => {
      var coord = coordinates(
        this.circle.posx,
        this.circle.posy,
        this.game.gameCanvasHeight,
        this.game.topY
      );

      this.ctx.lineWidth = this.circle.width;

      for (var j = 0; j < 4; j++) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = getColor(j + this.circle.color);
        /**
         * a = 0 , a2 = 90
         * a = 90, a2 = 180
         * a = 180 , a2 = 270
         * a = 270 , a2 = 360
         */
        var a = modAngle(this.circle.angle + (Math.PI / 2) * j);
        var a2 = modAngle(a + Math.PI / 2);
        this.ctx.arc(coord.x, coord.y, this.circle.radius, a, a2);
        this.ctx.stroke();
      }
    };
  }
}