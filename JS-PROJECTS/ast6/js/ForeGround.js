export default class ForeGround {
  constructor(game) {
    this.game = game;
    this.sourceX = 276;
    this.sourceY = 0;
    this.width = 224;
    this.height = 112;
    this.x = 0;
    this.dx = 2;
    this.y = this.game.cvs.height - 112;
  }

  draw() {
    this.game.ctx.drawImage(
      this.game.gameImage,
      this.sourceX,
      this.sourceY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );

    this.game.ctx.drawImage(
      this.game.gameImage,
      this.sourceX,
      this.sourceY,
      this.width,
      this.height,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }

  update() {
    if(this.game.GAMESTATE.current === this.game.GAMESTATE.game){
      this.x = (this.x - this.dx) % (this.width/2)
    }
  }
}
