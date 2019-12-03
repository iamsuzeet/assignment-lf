var app = document.getElementById('app');

var gameOne = new GameCreate(1);
var gameTwo = new GameCreate(2);

function GameCreate(newGame) {
  this.newGame = newGame;
  this.pause = true;
  this.gameScoreWrapper = document.createElement('div');
  this.gameScoreWrapper.classList.add('gamescore-wrapper');
  app.appendChild(this.gameScoreWrapper);
  this.gameContainer = document.createElement('div');
  this.gameContainer.classList.add('game-container');
  this.scoreContainer = document.createElement('div');
  this.scoreContainer.classList.add('score-container');
  this.gameScoreWrapper.appendChild(this.gameContainer);
  this.gameInstruction = document.createElement('div');
  this.gameInstruction.classList.add('game-instruction');
  this.gameInstruction.innerHTML =
    '<h2>2D Car Game</h2><p>Use arrow keys or A/D for left and right movement</p><p>Use "SPACEBAR" to Shoot enemy cars</p>';
  this.gameContainer.appendChild(this.gameInstruction);
  this.startButton = document.createElement('button');
  this.startButton.innerText = 'START GAME';
  this.startButton.classList.add('start-button');
  this.gameInstruction.appendChild(this.startButton);
  var that = this;

  this.scoreContainer.innerHTML =
    '<h2>Highest Score:</h2><p id="high-score">' +
    (localStorage.getItem('high-score') || 0) +
    '</p><h2>Your Score:</h2><p id="my-score">0</p>';

  this.gameScoreWrapper.appendChild(this.scoreContainer);
  this.startButton.addEventListener('click', function() {
    new StartGame(
      that.newGame,
      that.gameContainer,
      that.gameInstruction,
      that.scoreContainer,
      that.gameScoreWrapper
    );
  });
}

function StartGame(
  newGame,
  gameContainer,
  gameInstruction,
  scoreContainer,
  gameScoreWrapper
) {
  this.gameId = newGame;
  this.gameContainer = gameContainer;
  this.gameInstruction = gameInstruction;
  this.scoreContainer = scoreContainer;
  this.gameScoreWrapper = gameScoreWrapper;
  this.keydownPress = false;
  this.pause = false;
  this.newGame = new GameStart(
    this.gameContainer,
    this.gameInstruction,
    this.scoreContainer,
    this.gameId,
    this.gameScoreWrapper
  );
  this.newGame.init();
}

function GameOver(
  oldGame,
  gameContainer,
  gameInstruction,
  scoreContainer,
  gameScoreWrapper,
  score,
  highScore
) {
  this.gameScoreWrapper = gameScoreWrapper;
  this.oldGame = oldGame;
  this.gameInstruction = gameInstruction;
  this.scoreContainer = scoreContainer;
  this.score = score;
  this.highScore = highScore;
  this.gameContainer = gameContainer;
  this.gameContainer.innerHTML = '';

  this.gameOver = document.createElement('div');
  this.gameOver.classList.add('game-over');
  var self = this;

  this.gameOver.innerHTML =
    '<h2>CRASHED !!! GAME OVER</h2><p>Use arrow keys or A/D for left and right movement</p><p>Use "SPACEBAR" to Shoot enemy cars</p><button id="play-again" class="start-button">PLAY AGAIN</button>';

  this.scoreContainer.classList.add('score-container');

  this.scoreContainer.innerHTML =
    '<h2>Highest Score:</h2><p id="high-score">' +
    this.highScore +
    '</p><h2>Your Score:</h2><p id="my-score">' +
    this.score +
    '</p>';

  this.gameContainer.appendChild(this.gameOver);

  var gameOverClass = this.gameOver.classList[0];

  document
    .querySelector('.' + gameOverClass + ' > #play-again')
    .addEventListener('click', function() {
      self.gameScoreWrapper.remove();
      new GameCreate(self.oldGame);
    });
}

/**
 * GameStart Constructor function
 */
function GameStart(
  gameContainer,
  gameInstruction,
  scoreContainer,
  gameId,
  gameScoreWrapper
) {
  this.gameContainerWidth;
  this.gameContainerHeight;
  this.score = 0;
  this.highScore = localStorage.getItem('high-score') || 0;
  this.speed = 1;
  this.carDestroyScore = 0;
  this.speedCounter = 1;
  this.maxSpeed = 500;
  this.trackWrapper;
  this.trackInterval;
  this.playerCar;
  this.enemyCars = [];
  this.enemyCarCounter = 1;
  this.enemySpeed = 5;
  this.maxEnemyCar = 70;
  this.trackWrapperTop = -750;
  this.minTrackWrapperTop = -750;
  this.enemyCarBottom = 700;
  this.gameContainer = gameContainer;
  this.gameInstruction = gameInstruction;
  this.scoreContainer = scoreContainer;
  this.gameId = gameId;
  this.gameScoreWrapper = gameScoreWrapper;
  this.scoreContainerClass = this.scoreContainer.classList[0];

  //for bullet
  this.bulletAvailable = true;
  this.bulletCounter = 1;
  this.bulletCounterLimit = 20;
  this.bulletAvailableCounter = 1;
  this.bulletTotalLimit = 1000;
  this.bulletElement;
}

/**
 * GAME START
 */
GameStart.prototype.init = function() {
  if (this.gameInstruction) {
    this.gameInstruction.style.display = 'none';
  }

  this.scoreContainer.style.display = 'block';

  //get width height of game container
  this.gameContainerWidth = this.gameContainer.clientWidth;
  this.gameContainerHeight = this.gameContainer.clientHeight;

  //dom selection of score, highscore and speed
  document.querySelector(
    '.' + this.scoreContainerClass + ' > #high-score'
  ).innerHTML = this.highScore;
  document.querySelector(
    '.' + this.scoreContainerClass + ' > #my-score'
  ).innerHTML = this.score;

  //render road track image
  this.renderRoad();

  //render car
  this.renderCar(true, 125, 40);

  //move car left right
  document.onkeydown = this.moveCar.bind(this);

  //track image move
  this.trackInterval = setInterval(this.cycleTrack.bind(this), 1000 / 90);
};

/**
 * RENDER ROAD TRACK IMAGE
 */
GameStart.prototype.renderRoad = function() {
  this.trackWrapper = document.createElement('div');
  this.trackWrapper.style.position = 'absolute';
  this.trackWrapper.style.width = this.gameContainerWidth + 'px';
  this.trackWrapper.style.height = this.gameContainerHeight + 'px';
  this.trackWrapper.style.background = '#000';

  this.gameContainer.appendChild(this.trackWrapper);
  for (var i = 0; i < 3; i++) {
    var img = document.createElement('img');
    img.setAttribute('src', 'images/road.jpg');
    img.style.width = this.gameContainerWidth + 'px';
    img.style.height = this.gameContainerHeight + 'px';
    img.style.objectFit = 'cover';
    img.style.display = 'block';
    this.trackWrapper.appendChild(img);
  }
};

/**
 * RENDER CAR
 */

GameStart.prototype.renderCar = function(playerCar, posLeft, posBtm) {
  if (playerCar) {
    this.playerCar = new Car(
      this.gameContainer,
      'url(images/userCar.png',
      posLeft,
      posBtm
    );
    this.playerCar.carInit();
  } else {
    var enemyCar = new Car(
      this.gameContainer,
      'url(images/enemyCar.png)',
      posLeft,
      posBtm
    );
    enemyCar.carInit();
    this.enemyCars.push(enemyCar);
  }
};

/**
 * MOVE CAR LEFT RIGHT
 */

GameStart.prototype.moveCar = function() {
  if (event.keyCode === 65 || event.keyCode === 37) {
    if (!this.keydownPress && !this.pause) this.playerCar.moveLeft();
  } else if (event.keyCode === 68 || event.keyCode === 39) {
    if (!this.keydownPress && !this.pause) this.playerCar.moveRight();
  } else if (event.keyCode === 32) {
    if (!this.keydownPress && !this.pause && this.bulletAvailable) {
      this.playerCar.shooting = true;
      // this.bulletAvailable = false;
    }
  }
};

/**
 * move track road
 */
GameStart.prototype.cycleTrack = function() {
  this.speed < 5
    ? (this.speedCounter = (this.speedCounter + 1) % this.maxSpeed)
    : (this.speedCounter = 1);

  if (this.speedCounter == 0) {
    this.speed += 1;
    this.enemySpeed += 1;
    this.maxEnemyCar -= 10;
  }

  this.trackWrapperTop < 0
    ? (this.trackWrapperTop += this.enemySpeed)
    : (this.trackWrapperTop = this.minTrackWrapperTop);

  this.trackWrapper.style.top = this.trackWrapperTop + 'px';

  //move bullet
  this.bulletCounter = (this.bulletCounter + 1) % this.bulletCounterLimit;

  if (this.playerCar.shooting) {
    if (
      this.playerCar.bullets.length < this.playerCar.maxBullet &&
      this.bulletCounter == 0
    ) {
      this.playerCar.shootBullet();
    }

    for (var i = 0; i < this.playerCar.bullets.length; i++) {
      this.playerCar.bullets[i].style.bottom =
        parseInt(this.playerCar.bullets[i].style.bottom) +
        this.enemySpeed +
        'px';
    }

    if (this.playerCar.bullets.length > 0) {
      var check = 750;
      var lastBullet = parseInt(
        this.playerCar.bullets[this.playerCar.bullets.length - 1].style.bottom
      );

      if (lastBullet > check) {
        this.playerCar.shooting = false;
        this.playerCar.bullets = [];
      }

      console.log(this.playerCar.bullets);
    }
  }

  //collison between enemy car and move enemy car
  for (var i = 0; i < this.enemyCars.length; i++) {
    var flag = false;
    //move enemy car
    this.enemyCars[i].posBtm -= this.enemySpeed;
    this.enemyCars[i].draw();

    //2D COLLISON DETECTION
    if (
      this.playerCar.posLeft + 20 <
        this.enemyCars[i].posLeft + this.enemyCars[i].carWidth &&
      this.playerCar.posLeft + 80 > this.enemyCars[i].posLeft
    ) {
      // console.log('left collison');

      if (
        this.playerCar.posBtm + 40 <
          this.enemyCars[i].posBtm + this.enemyCars[i].carHeight &&
        this.playerCar.posBtm + 160 > this.enemyCars[i].posBtm
      ) {
        // console.log('bottom collison');
        pause = true;
        if (this.score > this.highScore) {
          document.querySelector(
            '.' + this.scoreContainerClass + ' > #high-score'
          ).innerHTML = this.score;

          this.highScore = localStorage.setItem('high-score', this.score);
        }
        clearInterval(this.trackInterval);
        new GameOver(
          this.gameId,
          this.gameContainer,
          this.gameInstruction,
          this.scoreContainer,
          this.gameScoreWrapper,
          this.score,
          this.highScore
        );
      }
    }

    //check collison for bullet with enemy car
    for (var j = 0; j < this.playerCar.bullets.length; j++) {
      if (
        parseInt(this.playerCar.bullets[j].style.left) <
          this.enemyCars[i].posLeft + this.enemyCars[i].carWidth &&
        parseInt(this.playerCar.bullets[j].style.left) + 10 >
          this.enemyCars[i].posLeft
      ) {
        if (
          parseInt(this.playerCar.bullets[j].style.bottom) <
            this.enemyCars[i].posBtm + this.enemyCars[i].carHeight &&
          parseInt(this.playerCar.bullets[j].style.bottom) + 10 >
            this.enemyCars[i].posBtm
        ) {
          this.enemyCars[i].domRemove();
          this.enemyCars.splice(i, 1);

          //car destroyed score
          this.carDestroyScore += 1;
          this.score += 1;

          document.querySelector(
            '.' + this.scoreContainerClass + ' > #my-score'
          ).innerHTML = this.score;

          flag = true;
          break;
        }
      }
    }

    //remove gone car from array and increase score after car passed without collison;
    if (!flag) {
      if (this.enemyCars[i].posBtm < -this.enemyCars[i].carHeight) {
        this.enemyCars.splice(i, 1);
        this.carDestroyScore += 1;
        this.score += 1;
        document.querySelector(
          '.' + this.scoreContainerClass + ' > #my-score'
        ).innerHTML = this.score;
      }
    }
  }

  // ADD ENEMY CARS
  this.enemyCarCounter = (this.enemyCarCounter + 1) % this.maxEnemyCar;

  if (this.enemyCarCounter == 0) {
    var carLeft = getCarFromLeftLane(getRandomLane());
    this.renderCar(false, carLeft, this.enemyCarBottom);
  }

  this.bulletAvailableCounter =
    (this.bulletAvailableCounter + 1) % this.bulletTotalLimit;

  if (this.bulletAvailableCounter == 0) {
    this.bulletAvailable = true;
  }
};

/**
 * REMOVE PASSED CAR FROM DOM
 */
Car.prototype.domRemove = function() {
  this.gameContainer.removeChild(this.carElement);
};

function getCarFromLeftLane(lane) {
  var leftY;
  if (lane == 1) {
    leftY = 125;
  } else if (lane == 2) {
    leftY = 310;
  } else {
    leftY = 490;
  }
  return leftY;
}

function getRandomLane() {
  return Math.round(Math.random() * (3 - 1) + 1);
}

/**
 * CAR CONSTRUCTOR FUNCTION
 */

function Car(gameContainer, imageUrl, posLeft, posBtm) {
  this.gameContainer = gameContainer;
  this.posBtm = posBtm;
  this.posLeft = posLeft;
  this.imageUrl = imageUrl;
  this.carWidth = 90;
  this.carHeight = 169;
  this.carElement;
  this.laneWidth = 185;
  this.leftPosLane = 125;
  this.rightPosLane = 490;
  this.bullets = [];
  this.maxBullet = 1;
  this.shooting = false;
}

/**
 * CAR INIT WITH STYLE
 */

Car.prototype.carInit = function() {
  this.carElement = document.createElement('div');
  this.carElement.style.position = 'absolute';
  this.carElement.style.backgroundImage = this.imageUrl;
  this.carElement.style.width = this.carWidth + 'px';
  this.carElement.style.height = this.carHeight + 'px';
  this.carElement.style.left = this.posLeft + 'px';

  this.draw();

  this.gameContainer.appendChild(this.carElement);
};

/**
 * CAR POSITION
 */

Car.prototype.draw = function() {
  this.carElement.style.bottom = this.posBtm + 'px';
};

/**
 * MOVE LEFT CAR
 */

Car.prototype.moveLeft = function() {
  if (this.posLeft > this.leftPosLane) {
    keydownPress = true;
    var leftInterval = setInterval(shiftLeft.bind(this), 1000 / 90);

    var nextPosleft = this.posLeft - this.laneWidth;

    function shiftLeft() {
      if (this.posLeft >= nextPosleft) {
        this.posLeft = nextPosleft;
        this.carElement.style.left = this.posLeft + 'px';
        keydownPress = false;
        clearInterval(leftInterval);
      }
    }
  }
};

/**
 * MOVE CAR RIGHT
 */
Car.prototype.moveRight = function() {
  if (this.posLeft < this.rightPosLane) {
    keydownPress = true;
    var rightInterval = setInterval(shiftRight.bind(this), 1000 / 90);

    var nextPosleft = this.posLeft + this.laneWidth;

    function shiftRight() {
      if (this.posLeft <= nextPosleft) {
        this.posLeft = nextPosleft;
        this.carElement.style.left = this.posLeft + 'px';
        keydownPress = false;
        clearInterval(rightInterval);
      }
    }
  }
};

/**
 * SHOOT BULLET
 */

Car.prototype.shootBullet = function() {
  var bullet = document.createElement('div');
  var bulletImg = document.createElement('img');
  bullet.style.width = '40px';
  bullet.style.height = '70px';
  bullet.style.position = 'absolute';
  bulletImg.style.width = '100%';
  bulletImg.style.height = '100%';
  bulletImg.setAttribute('src', 'images/missile.png');
  bullet.style.left = this.posLeft + 20 + 'px';

  var bulletStart = this.posBtm + this.carHeight;
  bullet.style.bottom = bulletStart + 'px';

  this.gameContainer.appendChild(bullet);
  bullet.appendChild(bulletImg);

  this.bullets.push(bullet);
};
