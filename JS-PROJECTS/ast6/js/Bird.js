export default class Bird {
  constructor(game) {
    this.game = game;
    this.period;
    this.frames = 0;
    this.x = 50;
    this.y = 150;
    this.width = 34;
    this.height = 26;
    this.frame = 0;
    this.animation = [
      { sourceX: 276, sourceY: 112 }, //bird pic1
      { sourceX: 276, sourceY: 139 }, //bird pic2
      { sourceX: 276, sourceY: 164 }, //brid pic3
      { sourceX: 276, sourceY: 139 } //bird pic2
    ];

    //gravity and speed
    this.speed = 0;
    this.gravity = 0.25;
    this.jump = 4.6;

    //for rotation
    this.rotation = 0;
    this.DEGREE = Math.PI / 180;

    //for collison
    this.radius = 12;
  }

  draw() {
    let birdAnimation = this.animation[this.frame];
    this.game.ctx.save();
    this.game.ctx.translate(this.x, this.y);
    this.game.ctx.rotate(this.rotation);
    this.game.ctx.drawImage(
      this.game.gameImage,
      birdAnimation.sourceX,
      birdAnimation.sourceY,
      this.width,
      this.height,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    this.game.ctx.restore();
  }

  flap() {
    this.speed = -this.jump;
  }

  update(frames) {
    this.frames = frames;

    // if game state is get ready state , bird must flag slowly
    this.period =
      this.game.GAMESTATE.current == this.game.GAMESTATE.getReady ? 10 : 5;

    // we increment frame by 1,each period

    this.frame += this.frames % this.period == 0 ? 1 : 0;

    //frame goes from 0 to 4, again to 0
    this.frame = this.frame % this.animation.length;

    if (this.game.GAMESTATE.current == this.game.GAMESTATE.getReady) {
      this.y = 150; //reset position of bird after game over
      this.rotation = 0 * this.DEGREE;
    } else {
      this.speed += this.gravity;
      this.y += this.speed;

      if (
        this.y + this.height / 2 >=
        this.game.cvs.height - this.game.foreground.height
      ) {
        this.y =
          this.game.cvs.height - this.game.foreground.height - this.height / 2;
        if (this.game.GAMESTATE.current == this.game.GAMESTATE.game) {
          this.game.GAMESTATE.current = this.game.GAMESTATE.over;
        }
      }

      //if the speed is greater than the jump means the bird is falling down
      if (this.speed >= this.jump) {
        this.rotation = 90 * this.DEGREE;
        this.frame = 1;
      } else {
        this.rotation = -25 * this.DEGREE;
      }
    }
  }

  speedReset(){
    this.speed = 0;
  }
}
