/**
 * files for changing color and color utilities
 */

export var colors = ['#FF3399', '#33FFFF', '#FFFF33', '#AA00FF'];

//return random color
export function randomColor() {
  return colors[Math.floor(4 * Math.random())];
}

//return color when given index
export function getColor(index) {
  var n = index;
  return colors[n % 4];
}

export var colorIndex = Math.floor(4 * Math.random());
