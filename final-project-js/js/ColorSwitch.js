import Obstacle from './Obstacle.js';
import { getDistanceAngle, coordinates } from './utility.js';
import { colors, getColor, colorIndex } from './colors.js';

export default class ColorSwitch {
  constructor(game) {
    this.game = game;
    this.ctx = this.game.ctx;
    this.playerInfo = this.game.playerInfo;
    //create color switches
    this.colSwitch = new Obstacle(
      this.game.gameCanvasWidth / 2,
      100 +
        this.game.obstacles.posY * this.game.obstacles.number +
        this.game.obstacles.posY / 2,
      15,
      '#FFFFFF',
      this.game
    );

    //add color switches properties
    this.addColorSwitchProps();
  }

  addColorSwitchProps() {
    // this.colSwitch.move = () => {
    //   this.colSwitch.destroy();
    // };

    this.colSwitch.move = () => {
      // check collison between player and switch ball
      if (
        getDistanceAngle(
          { x: this.colSwitch.posx, y: this.colSwitch.posy },
          { x: this.playerInfo.posx, y: this.playerInfo.posy }
        ).distance <
        this.playerInfo.radius + this.colSwitch.radius
      ) {
        var changeColor = colors[Math.floor(4 * Math.random())];

        while (this.playerInfo.color ==changeColor) {
          changeColor = colors[Math.floor(4 * Math.random())];
        }

        this.playerInfo.color = changeColor;

        //destroy switch after collison from obstacle array
        this.colSwitch.destroy();
      }
    };
    // draw switch on canvas
    this.colSwitch.draw = () => {
      var coord = coordinates(
        this.colSwitch.posx,
        this.colSwitch.posy,
        this.game.gameCanvasHeight,
        this.game.topY
      );

      for (var i = 0; i < 4; i++) {
        var a = (i * Math.PI) / 2;
        this.ctx.fillStyle = colors[i];
        this.ctx.beginPath();
        this.ctx.lineTo(coord.x, coord.y);
        this.ctx.arc(
          coord.x,
          coord.y,
          this.colSwitch.radius,
          a,
          a + Math.PI / 2
        );
        this.ctx.lineTo(coord.x, coord.y);
        this.ctx.fill();
      }
    };
  }
}
