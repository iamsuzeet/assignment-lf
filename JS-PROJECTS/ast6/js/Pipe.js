export default class Pipe {
  constructor(game) {
    this.game = game;
    this.score = this.game.score;
    this.bird = this.game.bird;

    this.frames;
    this.position = [];
    this.bottom = {
      sourceX: 502,
      sourceY: 0
    };

    this.top = {
      //for top pipe
      sourceX: 553,
      sourceY: 0
    };

    this.width = 53;
    this.height = 400;
    this.gap = 85;
    this.maxYPos = -150;
    this.dx = 2;
  }

  draw() {
    for (let i = 0; i < this.position.length; i++) {
      let p = this.position[i];

      let topYPos = p.y;
      let bottomYPos = p.y + this.height + this.gap;

      //top pipe
      this.game.ctx.drawImage(
        this.game.gameImage,
        this.top.sourceX,
        this.top.sourceY,
        this.width,
        this.height,
        p.x,
        topYPos,
        this.width,
        this.height
      );

      //bottom pipe
      this.game.ctx.drawImage(
        this.game.gameImage,
        this.bottom.sourceX,
        this.bottom.sourceY,
        this.width,
        this.height,
        p.x,
        bottomYPos,
        this.width,
        this.height
      );
    }
  }

  update(frames) {
    this.frames = frames;
    if (this.game.GAMESTATE.current !== this.game.GAMESTATE.game) return;

    if (this.frames % 100 == 0) {
      this.position.push({
        x: this.game.cvs.width,
        y: this.maxYPos * (Math.random() + 1)
      });
    }
    for (let i = 0; i < this.position.length; i++) {
      let p = this.position[i];

      let bottomPipeYPos = p.y + this.height + this.gap;

      //collison detection

      //top pipe
      if (
        this.bird.x + this.bird.radius > p.x &&
        this.bird.x - this.bird.radius < p.x + this.width &&
        this.bird.y + this.bird.radius > p.y &&
        this.bird.y - this.bird.radius < p.y + this.height
      ) {
        this.game.GAMESTATE.current = this.game.GAMESTATE.over;
      }

      //bottom pipe
      if (
        this.bird.x + this.bird.radius > p.x &&
        this.bird.x - this.bird.radius < p.x + this.width &&
        this.bird.y + this.bird.radius > bottomPipeYPos &&
        this.bird.y - this.bird.radius < bottomPipeYPos + this.height
      ) {
        this.game.GAMESTATE.current = this.game.GAMESTATE.over;
      }

      //move the pipes to the left
      p.x -= this.dx;

      //if pipes go beyond canvas, we delete them from array
      if (p.x + this.width < 0) {
        this.position.shift();
        this.score.value += 1;

        this.score.best = Math.max(this.score.value, this.score.best);

        localStorage.setItem('best', this.score.best);
      }
    }
  }

  reset(){
    this.position = [];
  }
}
