var gameCanvas = document.createElement('canvas');
var next;
window.ctx = gameCanvas.getContext('2d');
gameCanvas.height = window.innerHeight;
gameCanvas.width = (gameCanvas.height * 2) / 3;

document.body.appendChild(gameCanvas);

function game() {
  var current = Date.now();
  var deltaCurrent = current - next;

  gameStateHandler(deltaCurrent / 1000);
  next = current;
}

next = Date.now();

game();
// gameNotStartedEvents();
