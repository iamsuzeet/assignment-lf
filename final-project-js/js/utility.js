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
 * Draw star shape
 */

export function drawStar(
  posx,
  posy,
  radius1,
  angle,
  color,
  alpha,
  outline,
  game
) {
  var ctx = game.ctx;
  var coord = coordinates(posx, posy, game.gameCanvasHeight, game.topY);
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  for (var j = 0; j <= 5; j++) {
    var angle1 = (j * Math.PI * 2) / 5 - Math.PI / 2 - angle;
    var angle2 = angle1 + Math.PI / 5;
    var radius2 = radius1 * 0.5;
    ctx.lineTo(
      coord.x + radius1 * Math.cos(angle1),
      coord.y + radius1 * Math.sin(angle1)
    );
    ctx.lineTo(
      coord.x + radius2 * Math.cos(angle2),
      coord.y + radius2 * Math.sin(angle2)
    );
  }

  if (outline) {
    ctx.fill();
  } 
  ctx.globalAlpha = 1;
}

/**
 * mod angle
 */

export function modAngle(x) {
  var y = x;
  //for getting positive angle
  while (y < 0) {
    y += Math.PI * 2;
  }
  return y % (Math.PI * 2);
}

/**
 * get distance and angle
 */

export function getDistanceAngle(xy1, xy2) {
  return {
    distance: Math.sqrt(
      Math.pow(xy1.x - xy2.x, 2) + Math.pow(xy1.y - xy2.y, 2)
    ),
    angle: Math.atan2(xy1.y - xy2.y, xy2.x - xy1.x)
  };
}

/**
 * get random range
 */

export function randomRange(x1, x2) {
  return x1 + Math.random() * (x2 - x1);
}
