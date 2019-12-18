import Obstacle from './Obstacle.js';
import scatterPlayer from './scatterPlayer.js';

import { coordinates, modAngle, getDistanceAngle } from './utility.js';
import { getColor } from './colors.js';

export default class RightCircle {
  constructor(game, radius, speed, direction, posx, color) {
    this.posx = posx;
    this.game = game;
    this.ctx = this.game.ctx;
    this.defaultSpeed = this.game.defaultSpeed;
    this.obstacles = this.game.obstacles;
    this.obstaclesArr = this.game.obstaclesArr;
    this.radius = radius;
    this.speed = speed;
    this.direction = direction;

    //player info
    this.playerInfo = this.game.playerInfo;

    this.circle = new Obstacle(
      posx,
      100 + this.obstacles.posY * this.obstacles.number,
      this.radius,
      Math.floor(4 * Math.random()),
      this.game
    );

    this.circle.color = color;

    switch (this.circle.color) {
      case 0:
        this.circle.color = 3;
        break;
      case 1:
        this.circle.color = 2;
        break;
      case 2:
        this.circle.color = 1;
        break;
      case 3:
        this.circle.color = 0;
        break;
    }

    this.addCircleProps();
  }

  addCircleProps() {
    this.circle.angle = Math.PI * 2 * Math.floor(4 * Math.random());
    this.circle.speed = this.direction * this.speed;
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
        if (
          getColor(j + this.circle.color) != this.playerInfo.color &&
          !this.game.gameOver
        ) {
          //get distance and angle from two coordinates
          var dots = getDistanceAngle(
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
            var positiveAngle = modAngle(-dots.angle);
            if (positiveAngle > a && positiveAngle < a2) {
              scatterPlayer(this.game);
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
