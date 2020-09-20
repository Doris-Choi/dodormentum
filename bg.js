const body = document.querySelector('body');

const IMG_NUMBER = 6;

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function handleImgLoad() {}

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `/images/${imgNumber + 1}.jpg`;
  image.classList.add('bg-image');
  body.prepend(image);
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
