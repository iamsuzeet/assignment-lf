/**
 * return random color;
 */
export var colors = ['#FF3399', '#33FFFF', '#FFFF33', '#AA00FF'];

export function getColor(index) {
  var n = index;
  return colors[n % 4];
}

export var colorIndex = Math.floor(4 * Math.random());
