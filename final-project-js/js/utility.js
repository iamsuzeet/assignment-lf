/**
 * top Y coordinates on canvas for positioning elements
 */
export function coordinates(dx, dy, gameCanvasHeight, topY) {
  return { x: dx, y: gameCanvasHeight + topY - dy };
}

/**
 * return random number from given arguments
 */

export function randomValue(...args) {
  return args[Math.floor(args.length * Math.random())];
}

/**
 * Draw Circle
 */

export function drawCircle(coords, radius, color, game) {
  var ctx = game.ctx;
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(coords.x, coords.y, radius, 0, 2 * Math.PI);
  ctx.fill();
}

/**
 * mod angle
 */

export function modAngle(x) {
  var y = x;
  while (y < 0) {
    y += Math.PI * 2;
  }
  return y % (Math.PI * 2);
  
}

/**
 * get dots
 */

export function getDots(xy1, xy2) {
  return {
    d: Math.sqrt(Math.pow(xy1.x - xy2.x, 2) + Math.pow(xy1.y - xy2.y, 2)),
    a: Math.atan2(xy1.y - xy2.y, xy2.x - xy1.x)
  };
}
