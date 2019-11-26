var elem = document.getElementById('animate');
var pos = 0;
var posY = 1;
setInterval(function() {
  if (pos >= 350) {
    posY = -1;
  } else if (pos <= 0) {
    posY = +1;
  }
  pos = pos + posY;
  elem.style.top = pos + 'px';
}, 1);
