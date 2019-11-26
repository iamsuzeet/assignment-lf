var points = [
  { x: 10, y: 20 },
  { x: 40, y: 40 },
  { x: 60, y: 20 },
  { x: 80, y: 50 },
  { x: 100, y: 60 },
  { x: 120, y: 20 },
  { x: 70, y: 20 },
  { x: 45, y: 40 },
  { x: 250, y: 20 }
];

var mainWrapper = document.getElementById('main-wrapper');

points.forEach(function(point) {
  var child = document.createElement('div');
  child.style.height = '10px';
  child.style.width = '10px';
  child.style.backgroundColor = 'blue';
  child.style.position = 'absolute';
  child.style.borderRadius = '50%';
  child.style.top = point.x + 'px';
  child.style.left = point.y + 'px';
  mainWrapper.appendChild(child);
});
