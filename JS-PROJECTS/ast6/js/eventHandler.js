export default function eventHandler(game) {
  const startBtn = {
    x: 120,
    y: 263,
    width: 83,
    height: 29
  };
  game.cvs.addEventListener('click', event => {
    switch (game.GAMESTATE.current) {
      case game.GAMESTATE.getReady:
        game.GAMESTATE.current = game.GAMESTATE.game;
        break;
        
      case game.GAMESTATE.game:
        game.bird.flap();
        break;

      case game.GAMESTATE.over:
        let rect = game.cvs.getBoundingClientRect();
        let clickX = event.clientX - rect.left;
        let clickY = event.clientY - rect.top;

        //check if we click on start button
        if (
          clickX >= startBtn.x &&
          clickX <= startBtn.x + startBtn.width &&
          clickY >= startBtn.y &&
          clickY <= startBtn.y + startBtn.height
        ) {
          game.pipes.reset();
          game.bird.speedReset();
          game.score.value = 0;
          game.GAMESTATE.current = game.GAMESTATE.getReady;
        }

        break;
    }
  });
}
