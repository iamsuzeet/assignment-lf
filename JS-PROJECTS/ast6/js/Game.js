import Bird from './Bird.js';
import ForeGround from './ForeGround.js';
import eventHandler from './eventHandler.js';
import Pipe from './Pipe.js';

export default class Game {
  constructor(game) {
    this.ctx = game.cvs.getContext('2d');
    this.cvs = game.cvs;
    this.frames = 0;
    this.GAMESTATE = {
      current: 0,
      getReady: 0,
      game: 1,
      over: 2
    };
    this.score = {
      best: parseInt(localStorage.getItem('best')) || 0,
      value: 0
    };
    this.gameImage = game.gameImage;
      

    this.bird = new Bird(this);
    this.foreground = new ForeGround(this);
    this.pipes = new Pipe(this);
    eventHandler(this);
  }

  update() {
    this.frames++;
    this.foreground.update();
    this.bird.update(this.frames);
    this.pipes.update(this.frames);
  }

  //render all components on screen
  draw() {
    this.ctx.fillStyle = '#70c5ce';
    this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
    this.renderBackground();
    this.foreground.draw();
    this.bird.draw();
    this.pipes.draw();

    this.renderGetReadyState();
    this.renderGameOver();
    this.renderScoreState();
  }

  //render background-image for game

  renderBackground() {
    const position = {
      sourceX: 0,
      sourceY: 0,
      width: 275,
      height: 226,
      x: 0,
      y: this.cvs.height - 226
    };

    this.ctx.drawImage(
      this.gameImage,
      position.sourceX,
      position.sourceY,
      position.width,
      position.height,
      position.x,
      position.y,
      position.width,
      position.height
    );

    this.ctx.drawImage(
      this.gameImage,
      position.sourceX,
      position.sourceY,
      position.width,
      position.height,
      position.x + position.width,
      position.y,
      position.width,
      position.height
    );
  }

  //render get ready image

  renderGetReadyState() {
    const position = {
      sourceX: 0,
      sourceY: 228,
      width: 173,
      height: 152,
      x: this.cvs.width / 2 - 173 / 2,
      y: 80
    };

    if (this.GAMESTATE.current == this.GAMESTATE.getReady) {
      this.ctx.drawImage(
        this.gameImage,
        position.sourceX,
        position.sourceY,
        position.width,
        position.height,
        position.x,
        position.y,
        position.width,
        position.height
      );
    }
  }

  renderGameOver() {
    const position = {
      sourceX: 175,
      sourceY: 228,
      width: 225,
      height: 202,
      x: this.cvs.width / 2 - 225 / 2,
      y: 90
    };

    if (this.GAMESTATE.current == this.GAMESTATE.over) {
      this.ctx.drawImage(
        this.gameImage,
        position.sourceX,
        position.sourceY,
        position.width,
        position.height,
        position.x,
        position.y,
        position.width,
        position.height
      );
    }
  }

  renderScoreState() {
    this.ctx.fillStyle = '#FFF';
    this.ctx.strokeStyle = '#000';
    if (this.GAMESTATE.current == this.GAMESTATE.game) {
      this.ctx.lineWidth = 2;
      this.ctx.font = '35px Teko';
      this.ctx.fillText(this.score.value, this.cvs.width / 2, 50);
      this.ctx.strokeText(this.score.value, this.cvs.width / 2, 50);
    } else if (this.GAMESTATE.current == this.GAMESTATE.over) {
      //score value;
      this.ctx.font = '25px Teko';
      this.ctx.fillText(this.score.value, 225, 186);
      this.ctx.strokeText(this.score.value, 225, 186);

      //best score
      this.ctx.fillText(this.score.best, 225, 228);
      this.ctx.strokeText(this.score.best, 225, 228);
    }
  }
}
