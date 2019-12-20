import Obstacle from './Obstacle.js';
import { getDistanceAngle, coordinates } from './utility.js';
import { colors } from './colors.js';

export default class ColorSwitch {
  constructor(game) {
    //game props
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
    this.colSwitch.move = () => {
      // check collison between player and switch ball
      if (
        getDistanceAngle(
          { x: this.colSwitch.posx, y: this.colSwitch.posy },
          { x: this.playerInfo.posx, y: this.playerInfo.posy }
        ).distance <
        this.playerInfo.radius + this.colSwitch.radius
      ) {
        let changeColor = colors[Math.floor(4 * Math.random())];

        while (this.playerInfo.color == changeColor) {
          changeColor = colors[Math.floor(4 * Math.random())];
        }
        document.getElementById('colorswitch').play();
        this.playerInfo.color = changeColor;
        //destroy switch after collison from obstacle array
        this.colSwitch.destroy();
      }
    };
    // draw switch on canvas
    this.colSwitch.draw = () => {
      let coord = coordinates(
        this.colSwitch.posx,
        this.colSwitch.posy,
        this.game.gameCanvasHeight,
        this.game.topY
      );

      for (let i = 0; i < 4; i++) {
        let a = (i * Math.PI) / 2;
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
