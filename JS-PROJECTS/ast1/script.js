var carouselContainer = document.querySelector('.carousel-container');
var carouselImageWrapper = document.querySelector('.carousel-image-wrapper');
var carouselDots = document.querySelector('.carousel-dots');
var images = carouselImageWrapper.children;
var dots = carouselDots.children;

var next = document.getElementById('next');
var prev = document.getElementById('prev');
var auto = true;
var INTERVAL_TIME = 4000;
var IMG_WIDTH = 900;
var IMG_HEIGHT = 600;
var slideInterval;

// setting carousel container width and height;
carouselContainer.style.width = IMG_WIDTH + 'px';
carouselContainer.style.height = IMG_HEIGHT + 'px';

//calculating carousel image wrapper width;
var carouselWrapperWidth = images.length * IMG_WIDTH;
carouselImageWrapper.style.width = carouselWrapperWidth + 'px';

// setting style and width for each image

for (var index = 0; index < images.length; index++) {
  images[index].style.left = IMG_WIDTH * index + 'px';
}

// create dots below image container
for (var i = 0; i < images.length; i++) {
  carouselDots[i] = document.createElement('button');
  carouselDots.appendChild(carouselDots[i]);
}

//adding class to first children of carouselDots
carouselDots[0].classList.add('active-dots');

//button events

//next button click
next.addEventListener('click', function() {
  nextSlide();
  clearResetInterval();
});

//previous button click
prev.addEventListener('click', function() {
  prevSlide();
  clearResetInterval();
});

//slide to next image
function nextSlide() {
  var currentImage = carouselImageWrapper.querySelector('.active');
  var nextImage = currentImage.nextElementSibling;

  if (nextImage) {
    //slide to next image
    moveSlide(carouselImageWrapper, currentImage, nextImage);
    //update dots
    var currentDot = carouselDots.querySelector('.active-dots');
    var nextDot = currentDot.nextElementSibling;
    updateDots(currentDot, nextDot);
  } else {
    nextImage = images[0];
    //slide to next image
    moveSlide(carouselImageWrapper, currentImage, nextImage);

    //update dots
    var currentDot = carouselDots.querySelector('.active-dots');

    var dotsArr = [].slice.call(dots);
    var nextDot = dotsArr[0];
    updateDots(currentDot, nextDot);
  }
}

//return to previous image
function prevSlide() {
  var currentImage = carouselImageWrapper.querySelector('.active');
  var previousImage = currentImage.previousElementSibling;

  if (previousImage) {
    //slide to previous image
    moveSlide(carouselImageWrapper, currentImage, previousImage);

    //update dots
    var currentDot = carouselDots.querySelector('.active-dots');
    var prevDot = currentDot.previousElementSibling;
    updateDots(currentDot, prevDot);
  } else {
    previousImage = images[images.length - 1];

    //slide to previous image
    moveSlide(carouselImageWrapper, currentImage, previousImage);

    carouselImageWrapper.style.transform = 'translateX()';
    currentImage.classList.remove('active');
    previousImage.classList.add('active');

    //update dots
    var currentDot = carouselDots.querySelector('.active-dots');

    var dotsArr = [].slice.call(dots);
    var nextDot = dotsArr[dotsArr.length - 1];
    updateDots(currentDot, nextDot);
  }
}

//move images left or right
function moveSlide(carouselImageWrapper, currentImage, targetImage) {
  carouselImageWrapper.style.transform =
    'translateX(-' + targetImage.style.left + ')';
  currentImage.classList.remove('active');
  targetImage.classList.add('active');
}

//when clicking the dots
carouselDots.addEventListener('click', function(e) {
  var targetDot = e.target.closest('button');

  if (!targetDot) return;

  var currentImage = carouselImageWrapper.querySelector('.active');
  var currentDot = carouselDots.querySelector('.active-dots');

  var dotsArr = [].slice.call(dots);
  var targetIndex = dotsArr.indexOf(targetDot);

  var targetImage = images[targetIndex];

  //slide to target image
  moveSlide(carouselImageWrapper, currentImage, targetImage);
  updateDots(currentDot, targetDot);

  clearResetInterval();
});

//update class to target dots
function updateDots(currentDot, targetDot) {
  currentDot.classList.remove('active-dots');
  targetDot.classList.add('active-dots');
}

//clearing interval and setting new interval if next/prev button clicked or carousel dots clicked
function clearResetInterval() {
  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, INTERVAL_TIME);
  }
}

//auto slide
if (auto) {
  // run next slide at interval
  slideInterval = setInterval(nextSlide, INTERVAL_TIME);
}
