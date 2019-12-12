addEventListener('resize', function() {
  gameCanvas.height = window.innerHeight;
  gameCanvas.width = (gameCanvas.height * 2) / 3;
});
