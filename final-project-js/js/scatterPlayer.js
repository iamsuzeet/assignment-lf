import Particle from './Particle.js';

export default function scatterPlayer(game) {
  document.getElementById('dead').play();
  game.gameOver = true;
  repeatnewParticle(() => {
    new Particle(game);
  }, 14);
  game.counter1 = 1;
}

//implenting callback
function repeatnewParticle(cb, repeat) {
  for (var i = 0; i < repeat; i++) {
    cb();
  }
}
