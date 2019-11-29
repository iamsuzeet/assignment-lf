/**
 * Random hex color generator
 */
function randomColor() {
  return (
    '#' +
    Math.random()
      .toString(16)
      .slice(2, 8)
  );
}

/**
 * Get random Integer value
 */
function randomInt(min, max) {
  return Math.floor(Math.random() * (Math.ceil(max) - Math.floor(min)) + min);
}

/**
 * GAME PART
 *
 * ballCount - no. of ball needed,
 * minBallSize - minimum size for ball,
 * maxBallSize - maximum size for ball,
 * maxSpeed - maximum speed of ball movement
 * minspeed - minimum speed of ball movement
 *
 */

function Game(
  ballCount = 5,
  minBallSize = 5,
  maxBallSize = 25,
  minSpeed = 1,
  maxSpeed = 5
) {
  this.ballCount = ballCount;
  this.minBallSize = minBallSize;
  this.maxBallSize = maxBallSize;
  this.maxSpeed = maxSpeed;
  this.minSpeed = minSpeed;
  this.balls = [];

  this.app = document.getElementById('app');
  this.boxContainer = document.createElement('div');
  this.containerWidth;
  this.containerHeight;
}

/**
 * create box container
 */
Game.prototype.createBoxContainer = function() {
  this.boxContainer.classList.add('box-container');
  this.app.appendChild(this.boxContainer);
  var boxContainerStyle = getComputedStyle(this.boxContainer);
  this.containerWidth = parseInt(boxContainerStyle.width);
  this.containerHeight = parseInt(boxContainerStyle.height);
};

/**
 * create ball and give style from given input
 */

Game.prototype.createBall = function() {
  var overlapping = false;
  var protection = 0;

  // for (var i = 0; i < this.ballCount; i++) {
  while (this.balls.length < this.ballCount) {
    var ballRadius = randomInt(
      parseFloat(this.minBallSize),
      parseFloat(this.maxBallSize)
    );

    var top = randomInt(5, this.containerHeight - ballRadius * 2);
    var left = randomInt(5, this.containerWidth - ballRadius * 2);

    var overlapping = false;
    //check overlap when creating ball

    for (var j = 0; j < this.balls.length; j++) {
      var nextBall = this.balls[j];

      var dy = top - nextBall.top;
      var dx = left - nextBall.left;

      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < ballRadius + this.balls[j].radius) {
        overlapping = true;
        break;
      }
    }

    var ballSpeed = randomInt(
      parseFloat(this.minSpeed),
      parseFloat(this.maxSpeed)
    );
    var movementAngle = randomInt(0, 360);

    var ball = new Ball(
      this.boxContainer,
      top,
      left,
      ballRadius,
      ballSpeed,
      movementAngle
    );

    ball.ballInit();
    if (!overlapping) {
      this.balls.push(ball);
    }

    protection++;

    // check if ballcount exceed more than 100
    if (protection > 1000) {
      break;
    }
  }
};

/**
 * set interval for ball movement
 */
Game.prototype.moveInterval = function() {
  setInterval(this.moveBalls.bind(this), 1000 / 60);
};

/**
 * ball movement with collision check
 */

Game.prototype.moveBalls = function() {
  for (var i = 0; i < this.balls.length; i++) {
    //check collison with box container
    if (
      this.balls[i].top < 0 ||
      this.balls[i].left < 0 ||
      this.balls[i].left > this.containerWidth - this.balls[i].radius * 2 ||
      this.balls[i].top > this.containerHeight - this.balls[i].radius * 2
    ) {
      this.balls[i].angle = Math.abs((this.balls[i].angle + 90) % 360);
    }

    //check collision with other balls

    /**
     * 2d collison detection circle MDN
     */
    for (var j = 0; j < this.balls.length; j++) {
      if (this.balls[i] != this.balls[j]) {
        var dx = this.balls[i].centerX - this.balls[j].centerX;
        var dy = this.balls[i].centerY - this.balls[j].centerY;

        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= this.balls[i].radius + this.balls[j].radius) {
          //if collide set opposite angle for ball;
          this.balls[i].angle = Math.abs((this.balls[i].angle + 90) % 360);
          this.balls[j].angle = Math.abs((this.balls[j].angle + 90) % 360);
        }
      }
    }

    this.balls[i].move();
  }
};

/**
 * Class ball
 * parentElement = box container
 * top - absolute top
 * left - absolute top
 * radius - random ball radius
 * speed - movement of ball speed
 * angle - movement angle
 */
function Ball(parentElement, top, left, radius, speed, angle) {
  this.parentElement = parentElement;
  this.top = top;
  this.left = left;
  this.radius = radius;
  this.centerX = left + radius;
  this.centerY = top + radius;
  this.speed = speed;
  this.angle = angle;

  this.ballDiv = document.createElement('div');
}

/**
 * Ball init
 */
Ball.prototype.ballInit = function() {
  this.ballDiv.classList.add('box');
  this.ballDiv.style.width = this.radius * 2 + 'px';
  this.ballDiv.style.height = this.radius * 2 + 'px';
  this.ballDiv.style.backgroundColor = randomColor();
  this.parentElement.appendChild(this.ballDiv);

  this.draw();

  return this.ballDiv;
};

/**
 * position left right of ball
 */

Ball.prototype.draw = function() {
  this.ballDiv.style.left = this.left + 'px';
  this.ballDiv.style.top = this.top + 'px';
};

/**
 * move ball
 */
Ball.prototype.move = function() {
  //basically converting degree to radian for small value
  this.left += this.speed * Math.cos((this.angle / 180) * Math.PI);
  this.top += this.speed * Math.sin((this.angle / 180) * Math.PI);

  this.centerX = this.left + this.radius;
  this.centerY = this.top + this.radius;

  this.draw();
};

/**
 * start game
 */
Game.prototype.init = function() {
  this.createBoxContainer();
  this.createBall();
  this.moveInterval();
};

/**
 * object instance
 * 10 - number of balls
 * 5 - minimum size of ball in px
 * 30 - maximum size of ball in px
 * 1 - minimum speed for ball movement
 * 5 - maximum speed for ball movement
 */

var a = new Game(10, 5, 30, 1, 5);
a.init();

var b = new Game(10, 5, 40, 5, 7);
b.init();
