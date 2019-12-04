import Game from './Game.js';

export default class FlappyBird {
  constructor(gameId) {
    this.gameId = gameId;
    this.cvs = document.getElementById(`${this.gameId}`);
    this.game = new Game(this);
    this.gameloop();
  }

  gameloop() {
    this.game.update();
    this.game.draw();

    requestAnimationFrame(this.gameloop.bind(this));
  }
}

new FlappyBird('game1');
new FlappyBird('game2');
new FlappyBird('game3');
