/**
 * files for changing color and color utilities
 */

export const colors = ['#FF3399', '#33FFFF', '#FFFF33', '#AA00FF'];

//return random color
export function randomColor() {
  return colors[Math.floor(4 * Math.random())];
}

//return color when given index
export function getColor(index) {
  let n = index;
  return colors[n % 4];
}

//return random color index
export let colorIndex = Math.floor(4 * Math.random());
