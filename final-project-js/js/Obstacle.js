import { drawCircle, coordinates } from './utility.js';

export default class Obstacle {
  constructor(posx, posy, radius, color, game) {
    this.game = game;
    this.gameCanvasHeight = this.game.gameCanvasHeight;
    this.topY = this.game.topY;
    this.obstaclesArr = this.game.obstaclesArr;

    //create object for obstacles
    this.newObstacle = {
      posx,
      posy,
      radius,
      color,
      obstacleCount: 0,
      isDestroyed: false,
      draw: () => {
        drawCircle(
          coordinates(this.newObstacle.posx, this.newObstacle.posy,this.gameCanvasHeight, this.topY),
          this.newObstacle.radius,
          this.newObstacle.color,
          this.game
        );
      },
      destroy: () => {
        this.newObstacle.isDestroyed = true;
      },
      update: () => {
        //draw circle;
        this.newObstacle.draw();

        if (this.newObstacle.posy + 100 < this.topY) {
          this.newObstacle.destroy();
        }
      }
    };

    //push created obstacles to array
    this.obstaclesArr.push(this.newObstacle);

    return this.newObstacle;
  }
}
