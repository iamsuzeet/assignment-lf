function gameStateHandler(playGameParams) {
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  switch (state.gameState) {
    case 'notStarted':
      notStartedGameState();
      break;
    case 'playing':
      playingGameState(playGameParams);
      break;
    case 'gameOver':
      gameOverState();
      break;
  }
}

function notStartedGameState() {
  ctx.fillStyle = '#FF1654';
  ctx.font = '160px "Press Start 2P"';
  ctx.fillText('Color', 70, 270);
  ctx.fillStyle = '#247BA0';
  ctx.font = '180px Arial';
  ctx.fillText('Switch', 0, 410);
}
