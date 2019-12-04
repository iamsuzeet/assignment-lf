import Game from './Game.js';
var gameImage = document.createElement('img');
gameImage.setAttribute('src', '../images/sprite.png');

export default class FlappyBird {
  constructor(gameId) {
    this.gameId = gameId;
    this.cvs = document.getElementById(`${this.gameId}`);
    this.game = new Game(this, gameImage);
    this.gameloop();
  }

  gameloop() {
    this.game.update();
    this.game.draw();

    requestAnimationFrame(this.gameloop.bind(this));
  }
}

gameImage.onload = function() {
  new FlappyBird('game1', gameImage);
  new FlappyBird('game2', gameImage);
  new FlappyBird('game3', gameImage);
};
