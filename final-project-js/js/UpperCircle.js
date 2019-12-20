import Obstacle from './Obstacle.js';
import scatterPlayer from './scatterPlayer.js';

import { coordinates, modAngle, getDistanceAngle } from './utility.js';
import { getColor } from './colors.js';

export default class UpperCircle {
  constructor(game, radius, speed, direction, posx, c2posy) {
    this.posx = posx;
    this.game = game;
    this.ctx = this.game.ctx;
    this.defaultSpeed = this.game.defaultSpeed;
    this.obstacles = this.game.obstacles;
    this.obstaclesArr = this.game.obstaclesArr;
    this.radius = radius;
    this.speed = speed;
    this.direction = direction;
    this.circle1posy = c2posy;

    //player info
    this.playerInfo = this.game.playerInfo;

    this.circle = new Obstacle(
      posx,
      this.circle1posy + 140,
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
      let coord = coordinates(
        this.circle.posx,
        this.circle.posy,
        this.game.gameCanvasHeight,
        this.game.topY
      );

      this.ctx.lineWidth = this.circle.width;

      for (let j = 0; j < 4; j++) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = getColor(j + this.circle.color);
        /**
         * a = 0 , a2 = 90
         * a = 90, a2 = 180
         * a = 180 , a2 = 270
         * a = 270 , a2 = 360
         */
        let a = modAngle(this.circle.angle + (Math.PI / 2) * j);
        let a2 = modAngle(a + Math.PI / 2);
        if (
          getColor(j + this.circle.color) != this.playerInfo.color &&
          !this.game.gameOver
        ) {
          //get distance and angle from two coordinates
          let dots = getDistanceAngle(
            coord,
            coordinates(
              this.playerInfo.posx,
              this.playerInfo.posy,
              this.game.gameCanvasHeight,
              this.game.topY
            )
          );

          //check both up collison and down collison
          if (
            dots.distance - this.playerInfo.radius <
              this.circle.radius + this.circle.width / 2 &&
            dots.distance + this.playerInfo.radius >
              this.circle.radius - this.circle.width / 2
          ) {
            let positiveAngle = modAngle(-dots.angle);
            if (positiveAngle > a && positiveAngle < a2) {
              // scatterPlayer(this.game);
              console.log('collison');
            }
          }
        }
        this.ctx.arc(coord.x, coord.y, this.circle.radius, a, a2);
        this.ctx.stroke();
      }
      this.circle.angle += (this.circle.speed * Math.PI) / 180;
    };
  }
}
