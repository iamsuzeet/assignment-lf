import Player from './Player.js';
import CircleObstacle from './CircleObstacle.js';
import LeftCircle from './LeftCircle.js';
import RightCircle from './RightCircle.js';
import ColorSwitch from './ColorSwitch.js';
import ScoreStar from './ScoreStar.js';

//helper functions
import { coordinates, randomValue } from './utility.js';
import { getColor, colorIndex } from './colors.js';

class Game {
  constructor() {
    this.body = document.querySelector('body');
    this.gameCanvas = document.createElement('canvas');
    this.ctx = this.gameCanvas.getContext('2d');
    //game props
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
    this.bestScore = localStorage.getItem('best-score') || 0;
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
    //game loop begin here
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
    this.gameIsOver();
    this.clicked = false;
  }

  //ctx fill style for game start
  gameStartFillStyle() {
    this.ctx.fillStyle = '#222222';
    this.ctx.fillRect(0, 0, this.gameCanvasWidth, this.gameCanvasHeight);
    this.ctx.fillStyle = '#FFF';
    this.ctx.font = '25px serif';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(this.score, 10, 30);
    this.ctx.font = '40px serif';
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
      2 + Math.floor(this.topY / this.obstacles.posY)
    ) {
      this.obstacles.number += 1;

      //random value parameter effects on probability of different obstacles
      switch (randomValue(0,0,0,0,0,1,2,2,2,2,2)) {
      // switch (randomValue(3)) {
        //single circle obstacle
        case 0:
          new CircleObstacle(
            this,
            randomValue(100, 100, 70),
            1,
            randomValue(-1, 1),
            this.gameCanvasWidth / 2
          );
          break;
        //circle with inner circle
        case 1:
          let c2 = new RightCircle(this, 100, 1, 1, this.gameCanvasWidth / 2);
          let c2Color = c2.circle.color;
          new LeftCircle(
            this,
            70,
            1,
            -1,
            this.gameCanvasWidth / 2,
            c2Color,
            true
          );
          break;
        //two circle side by side
        case 2:
          let c1 = new RightCircle(this, 70, 1, 1, this.gameCanvasWidth - 105);
          let c1Color = c1.circle.color;
          new LeftCircle(
            this,
            70,
            1,
            1,
            this.gameCanvasWidth / 3.4,
            c1Color,
            false
          );
          break;
        // 8 cirle shape not completed
        // case 3:
        //   new EightCircleShape(this);
        //   break;
        // case 3:
        //   new LineObstacle(this,0,0,0,0);
        //small circle that will make 8 shape not working yet

        //two circle up and down not working yet
        // case 3:
        //   let c2 = new CircleObstacle(this, 65, 1, 1, this.gameCanvasWidth / 2);
        //   //score star shape
        //   new ScoreStar(this);
        //   let c2posy = c2.circle.posy;

        //   new UpperCircle(this, 65, 1, 1, this.gameCanvasWidth / 2, c2posy);
      }
      //score star shape
      new ScoreStar(this);
      //player color switch
      new ColorSwitch(this);
      this.defaultSpeed *= 1.04;
    }
  }

  //update obstacles each obstacles in array
  updateObstacles() {
    for (let i in this.obstaclesArr) {
      this.obstaclesArr[i].update();
    }
    for (let i = this.obstaclesArr.length - 1; i >= 0; i--) {
      if (this.obstaclesArr[i].isDestroyed) {
        this.obstaclesArr.splice(i, 1);
      }
    }
  }

  // update top y after player tap and counter after gameover
  updateTopYCounter() {
    this.topY = Math.max(this.topY, this.playerInfo.posy - 250);
  }

  // game over
  gameIsOver() {
    this.counter += this.counter1;
    if (this.counter > 70) {
      //local storage persist
      if (this.score > this.bestScore) {
        localStorage.setItem('best-score', this.score);
        this.bestScore = this.score;
      }

      //display local storage high score and player score
      this.ctx.globalAlpha = 1;
      this.ctx.fillStyle = '#222';
      this.ctx.fillRect(0, 0, this.gameCanvasWidth, this.gameCanvasHeight);
      this.ctx.fillStyle = '#EEE';

      this.ctx.font = '30px serif';
      this.ctx.lineWidth = 2;
      this.ctx.fillText(
        'SCORE',
        this.gameCanvasWidth / 2,
        this.gameCanvasHeight / 4
      );
      this.ctx.fillText(
        this.score,
        this.gameCanvasWidth / 2,
        this.gameCanvasHeight / 3
      );

      this.ctx.fillText(
        'BEST SCORE',
        this.gameCanvasWidth / 2,
        this.gameCanvasHeight / 2
      );
      this.ctx.fillText(
        this.bestScore,
        this.gameCanvasWidth / 2,
        this.gameCanvasHeight / 1.7
      );

      this.ctx.font = '15px serif';
      this.ctx.fillText(
        'TAP TO PLAY AGAIN',
        this.gameCanvasWidth / 2,
        this.gameCanvasHeight / 1.1
      );

      //new game begin if clicked on canvas after game over
      if (this.clicked) {
        this.counter = 0;
        this.counter1 = 0;
        new Game().init();
      }
    }
  }
}

new Game().init();
