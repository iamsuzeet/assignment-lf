import Player from './Player.js';
import CircleObstacle from './CircleObstacle.js';
//helper functions
import { coordinates, randomValue } from './utility.js';
import { getColor, colorIndex } from './colors.js';

class Game {
  constructor() {
    this.body = document.querySelector('body');
    this.gameCanvas = document.createElement('canvas');
    this.ctx = this.gameCanvas.getContext('2d');
    this.gameCanvasWidth = 360;
    this.gameCanvasHeight = 512;
    this.window = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    this._gameCanvasHeight = this.window.height;
    this._gameCanvasWidth =
      (this.window.height * this.gameCanvasWidth) / this.gameCanvasHeight;

    //game variables
    this.counter = 0;
    this.score = 0;
    this.clicked = false;
    this.gameOver = false;
    this.topY = 0;
    this.defaultSpeed = 1;
    this.obstacles = {
      number: 0,
      posY: 350
    };
    this.obstaclesArr = [];
    this.counter1 = 0;

    //player props
    this.playerInfo = {
      posx: this.gameCanvasWidth / 2,
      posy: this.gameCanvasHeight / 4,
      radius: 10,
      color: getColor(colorIndex),
      playerSpeed: 0,
      maxPlayerSpeed: 6,
      acceleration: 0
    };
    this.playerInfo.posy1 = this.playerInfo.posy;
  }

  init() {
    this.createCanvas();
    this.gameCanvas.onclick = () => {
      this.clicked = true;
    };
    setInterval(this.gameloop.bind(this), 1000 / 60);
  }

  createCanvas() {
    this.gameCanvas.width = this.gameCanvasWidth;
    this.gameCanvas.height = this.gameCanvasHeight;

    // if window size is smaller than canvas width and height
    if (
      this.gameCanvasWidth / this.gameCanvasHeight >
      this.window.width / this.window.height
    ) {
      this._gameCanvasWidth = this.window.width;
      this._gameCanvasHeight =
        (this.window.height * this.gameCanvasHeight) / this.gameCanvasWidth;
    }

    //canvas style attributes
    this.gameCanvas.style.position = 'absolute';
    this.gameCanvas.style.top =
      (this.window.height - this._gameCanvasHeight) / 2 + 'px';
    this.gameCanvas.style.left =
      (this.window.width - this._gameCanvasWidth) / 2 + 'px';
    this.gameCanvas.style.width = this._gameCanvasWidth + 'px';
    this.gameCanvas.style.height = this._gameCanvasHeight + 'px';

    this.body.appendChild(this.gameCanvas);
  }

  //game loop
  gameloop() {
    this.gameStartFillStyle();
    this.generateObstacles();
    new Player(this);
    this.updateObstacles();
    this.updateTopYCounter();
    this.clicked = false;
  }

  //ctx fill style for game start
  gameStartFillStyle() {
    this.ctx.fillStyle = '#222222';
    this.ctx.fillRect(0, 0, this.gameCanvasWidth, this.gameCanvasHeight);
    this.ctx.fillStyle = '#FFF';
    this.ctx.font = '30px Arial';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(this.score, 10, 30);
    this.ctx.font = '50px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(
      'TAP',
      this.gameCanvasWidth / 2,
      coordinates(0, 250, this.gameCanvasHeight, this.topY).y
    );
    this.ctx.fillText(
      'TO PLAY',
      this.gameCanvasWidth / 2,
      coordinates(0, 200, this.gameCanvasHeight, this.topY).y
    );
  }

  //generate random shapes obstacles
  generateObstacles() {
    while (
      this.obstacles.number <
      1 + Math.floor(this.topY / this.obstacles.posY)
    ) {
      this.obstacles.number += 1;

      switch (randomValue(0)) {
        case 0:
          new CircleObstacle(
            this,
            randomValue(100, 100, 70),
            1,
            randomValue(-1, 1)
          );
          break;
      }
      this.defaultSpeed *= 1.04;
    }
  }

  //rotate update obstacles
  updateObstacles() {
    for (var i in this.obstaclesArr) {
      this.obstaclesArr[i].update();
    }
  }

  // update top y after player tap and counter after gameover
  updateTopYCounter() {
    this.topY = Math.max(this.topY, this.playerInfo.posy - 250);
  }
}

new Game().init();
