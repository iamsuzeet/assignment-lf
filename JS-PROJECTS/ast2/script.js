/**
 * carouselId = carousel id given to carousel container
 * auto = true/false for auto slide
 * Interval time = hold time in seconds
 * container_width = container width for image
 * img_width = width of image
 */

function Carousel(carouselId, auto, interval_time, container_width, img_width) {
  //value passed from object creation
  this.auto = auto;
  this.INTERVAL_TIME = interval_time * 1000;
  this.CONTAINER_WIDTH = container_width;
  this.IMG_WIDTH = img_width;
  this.slideInterval;

  //create div and dom selections
  this.carouselContainer = document.getElementById(carouselId);
  this.carouselImageWrapper = this.carouselContainer.children[0];

  this.carouselDots = document.createElement('div');
  this.arrowBtn = document.createElement('div');

  this.images = this.carouselImageWrapper.children;
  this.dots = this.carouselDots.children;

  //determine auto slide or off
  if (this.auto) {
    // run next slide at interval
    this.slideInterval = setInterval(
      this.nextSlide.bind(this),
      this.INTERVAL_TIME
    );
  }
}

/**
 * SET CONTAINER WIDTH AND CALCULATE IMAGE WRAPPER WIDTH FOR CSS *
 */
Carousel.prototype.containerImageWrapperWidth = function() {
  // setting carousel container width and height;
  this.carouselContainer.style.width = this.CONTAINER_WIDTH + '%';
  this.carouselContainer.style.margin = '0 auto';
  this.carouselContainer.style.position = 'relative';
  this.carouselContainer.style.overflow = 'hidden';

  //calculating carousel image wrapper width;
  var carouselWrapperWidth = this.images.length * this.IMG_WIDTH;
  this.carouselImageWrapper.style.width = carouselWrapperWidth + 'px';
  this.carouselImageWrapper.style.position = 'relative';
  this.carouselImageWrapper.style.margin = '0';
  this.carouselImageWrapper.style.padding = '0';
  this.carouselImageWrapper.style.transition = 'transform 0.6s ease-in';

  // setting style and width for each image

  for (var index = 0; index < this.images.length; index++) {
    this.images[index].style.left = this.IMG_WIDTH * index + 'px';
    this.images[index].style.float = 'left';
  }

  this.images[this.images.length - 1].style.float = 'none';
};

/**
 * CREATE LEFT & RIGHT ARROW
 */
Carousel.prototype.createArrow = function createArrow() {
  var that = this;
  //add button div to container
  this.arrowBtn.classList.add('buttons');
  this.carouselContainer.appendChild(this.arrowBtn);

  //create left arrow
  var leftArrow = document.createElement('button');
  leftArrow.classList.add('prev');
  leftArrow.innerHTML = '<i class="fas fa-arrow-left"></i>';
  this.arrowBtn.appendChild(leftArrow);

  //create right arrow
  var rightArrow = document.createElement('button');
  rightArrow.classList.add('next');
  rightArrow.innerHTML = '<i class="fas fa-arrow-right"></i>';
  this.arrowBtn.appendChild(rightArrow);

  //next button click
  rightArrow.addEventListener('click', function() {
    that.nextSlide();
    that.clearResetInterval();
  });

  //previous button click
  leftArrow.addEventListener('click', function() {
    that.prevSlide();
    that.clearResetInterval();
  });
};

/** EVENT LISTENER ON LEFT AND RIGHT WITH INDICATORS */

/**
 * CREATE CAROUSEL INDICATORS
 */
Carousel.prototype.createCarouselIndicators = function createCarouselIndicators() {
  //add carousel dots to container
  this.carouselDots.classList.add('carousel-dots');
  this.carouselContainer.appendChild(this.carouselDots);

  // create dots below image container
  for (var i = 0; i < this.images.length; i++) {
    this.carouselDots[i] = document.createElement('button');
    this.carouselDots.appendChild(this.carouselDots[i]);
  }

  //adding class to first children of carouselDots
  this.carouselDots[0].classList.add('active-dots');

  // indicator listener
  this.dotsIndicatorsEvent();
};

/**
 * NEXT SLIDE
 */
Carousel.prototype.nextSlide = function nextSlide() {
  var currentImage = this.carouselImageWrapper.querySelector('.active');
  var nextImage = currentImage.nextElementSibling;

  if (nextImage) {
    //slide to next image
    this.moveSlide(this.carouselImageWrapper, currentImage, nextImage);
    //update dots
    var currentDot = this.carouselDots.querySelector('.active-dots');
    var nextDot = currentDot.nextElementSibling;
    this.updateDots(currentDot, nextDot);
  } else {
    nextImage = this.images[0];
    //slide to next image
    this.moveSlide(this.carouselImageWrapper, currentImage, nextImage);

    //update dots
    var currentDot = this.carouselDots.querySelector('.active-dots');

    var dotsArr = [].slice.call(this.dots);
    var nextDot = dotsArr[0];
    this.updateDots(currentDot, nextDot);
  }
};

/**
 * PREVIOUS SLIDE
 */

Carousel.prototype.prevSlide = function prevSlide() {
  var currentImage = this.carouselImageWrapper.querySelector('.active');
  var previousImage = currentImage.previousElementSibling;

  if (previousImage) {
    //slide to previous image
    this.moveSlide(this.carouselImageWrapper, currentImage, previousImage);

    //update dots
    var currentDot = this.carouselDots.querySelector('.active-dots');
    var prevDot = currentDot.previousElementSibling;
    this.updateDots(currentDot, prevDot);
  } else {
    previousImage = this.images[this.images.length - 1];

    //slide to previous image
    this.moveSlide(this.carouselImageWrapper, currentImage, previousImage);

    //update dots
    var currentDot = this.carouselDots.querySelector('.active-dots');

    var dotsArr = [].slice.call(this.dots);
    var nextDot = dotsArr[dotsArr.length - 1];
    this.updateDots(currentDot, nextDot);
  }
};

/**
 * INDICATOR LISTENER
 */
Carousel.prototype.dotsIndicatorsEvent = function() {
  var that = this;
  this.carouselDots.addEventListener('click', function(e) {
    var targetDot = e.target.closest('button');

    if (!targetDot) return;

    var currentImage = that.carouselImageWrapper.querySelector('.active');
    var currentDot = that.carouselDots.querySelector('.active-dots');

    var dotsArr = [].slice.call(that.dots);
    var targetIndex = dotsArr.indexOf(targetDot);

    var targetImage = that.images[targetIndex];

    //slide to target image
    that.moveSlide(that.carouselImageWrapper, currentImage, targetImage);
    that.updateDots(currentDot, targetDot);

    that.clearResetInterval();
  });
};

/**
 * REMOVE OLD INDICATOR CLASS AND ADD TO CURRENT INDICATOR
 */
Carousel.prototype.updateDots = function(currentDot, targetDot) {
  currentDot.classList.remove('active-dots');
  targetDot.classList.add('active-dots');
};

/**
 * MOVE IMAGE POSITION LEFT OR RIGHT
 */
Carousel.prototype.moveSlide = function(
  carouselImageWrapper,
  currentImage,
  targetImage
) {
  carouselImageWrapper.style.transform =
    'translateX(-' + targetImage.style.left + ')';
  currentImage.classList.remove('active');
  targetImage.classList.add('active');
};

/**
 * CLEARING INTERVAL AND SETTING NEW INTERVAL IF NEXT/PREV BUTTON CLICKED OR CAROUSEL INDICATORS CLICK
 */
Carousel.prototype.clearResetInterval = function clearResetInterval() {
  if (this.auto) {
    clearInterval(this.slideInterval);
    this.slideInterval = setInterval(
      this.nextSlide.bind(this),
      this.INTERVAL_TIME
    );
  }
};

/**
 * INIT CAROUSEL WITH SLIDER AND INDICATORS */
Carousel.prototype.init = function() {
  this.containerImageWrapperWidth();
  this.createArrow();
  this.createCarouselIndicators();
};

/**
 * carousel-1 = carousel id
 * true = auto slide,
 * 4 = hold time,
 * 50 - container width in percantage,
 * 900 = image width in px
 */

var carouselId1 = new Carousel('carousel-1', true, 4, 50, 900);
carouselId1.init();

var carouselId2 = new Carousel('carousel-2', true, 2, 70, 1000);
carouselId2.init();

var carouselId3 = new Carousel('carousel-3', false, 0, 60, 900);
carouselId3.init();