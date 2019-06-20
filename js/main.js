'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = [
  'Артём',
  'Максим',
  'Марат',
  'Илья',
  'Стас',
  'Ксюша',
  'Наташа',
  'Марина',
];
var MIN_SCALE = 0;
var MAX_SCALE = 100;
var STEP = 25;

var avatarQuantity = 6;
var photosQuantity = 25;
var effects = [
  'effects__preview--none',
  'effects__preview--chrome',
  'effects__preview--sepia',
  'effects__preview--marvin',
  'effects__preview--phobos',
  'effects__preview--heat'
];

var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var photosListElement = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
var photosCollection = createPhotosArray(photosQuantity);
var uploadForm = document.querySelector('#upload-select-image');
var uploadPreview = document.querySelector('.img-upload__preview');
var effectRadioList = document.querySelector('.effects__list');
var effectLevel = uploadForm.querySelector('.effect-level');
var effectDepth = uploadForm.querySelector('.effect-level__depth');
var levelPin = uploadForm.querySelector('.effect-level__pin');
var uploadInput = document.querySelector('#upload-file');
var uploadOverlay = document.querySelector('.img-upload__overlay');
var uploadOverlayCloseBt = document.querySelector('.img-upload__cancel');
var effectLevelValueElement = effectLevel.querySelector('.effect-level__value');
var imageUploadPreviewElement = uploadPreview.firstElementChild;
var scaleControlSmaller = uploadOverlay.querySelector('.scale__control--smaller');
var scaleControlBigger = uploadOverlay.querySelector('.scale__control--bigger');
var scaleCntrolValue = uploadOverlay.querySelector('.scale__control--value');
scaleCntrolValue.value = 100 + '%';


renderPhotos(photosCollection);

uploadInput.addEventListener('change', function () {
  openUploadOverlay();
  effectRadioList.addEventListener('click', chooseEffect);
});

uploadOverlayCloseBt.addEventListener('click', function () {
  closeUploadOverlay();
  effectRadioList.removeEventListener('click', chooseEffect);
});

levelPin.addEventListener('mouseup', function () {
  changeIntensityEffect();
});

scaleControlSmaller.addEventListener('click', function () {
  outZoom();
});

scaleControlBigger.addEventListener('click', function () {
  inZoom();
});

function getElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createAvatar(number) {
  return 'img/avatar-' + number + '.svg';
}

function createComments(number) {
  var comments = [];
  for (var i = 0; i <= number; i++) {
    comments.push({
      avatar: createAvatar(getRandomFromInterval(1, avatarQuantity)),
      message: getElement(COMMENTS),
      name: getElement(NAMES)
    });
  }
  return comments;
}

function createPhotosArray(number) {
  var photosArray = [];
  for (var i = 1; i <= number; i++) {
    photosArray.push({
      url: 'photos/' + i + '.jpg',
      likes: getRandomFromInterval(15, 200),
      comments: createComments(getRandomFromInterval(1, 4)),
    });
  }
  return photosArray;
}

function renderPhoto(photo) {
  var photoElement = similarPictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').setAttribute('src', photo.url);
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return photoElement;
}

function renderPhotos(photos) {
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPhoto(photos[i]));
  }
  photosListElement.appendChild(fragment);
}

function onUploadOverlayEscPress(evt) {
  if (evt.keyCode === 27) {
    closeUploadOverlay();
  }
}

function openUploadOverlay() {
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onUploadOverlayEscPress);
}

function closeUploadOverlay() {
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onUploadOverlayEscPress);
}

function chooseEffect(evt) {
  for (var i = 0; i < effects.length; i++) {
    if (evt.target.value === 'none') {
      effectLevel.classList.add('hidden');
    } else {
      effectLevel.classList.remove('hidden');
    }
    if ('effects__preview--' + evt.target.value === effects[i]) {
      uploadPreview.classList.add('effects__preview--' + evt.target.value);
    } else {
      uploadPreview.classList.remove(effects[i]);
    }
  }

  effectDepth.style.width = 0;
  levelPin.style.left = 0;
}

function changeIntensityEffect() {
  if (imageUploadPreviewElement.classList === 'effects__preview--chrome') {
    imageUploadPreviewElement.style.filter =
      'grayscale(' + effectLevelValueElement.value + ')';
  } else if (
    imageUploadPreviewElement.classList === 'effects__preview--sepia'
  ) {
    imageUploadPreviewElement.style.filter =
      'sepia(' + effectLevelValueElement.value + ')';
  } else if (
    imageUploadPreviewElement.classList === 'effects__preview--marvin'
  ) {
    imageUploadPreviewElement.style.filter =
      'invert(' + effectLevelValueElement.value * 100 + '%)';
  } else if (
    imageUploadPreviewElement.classList === 'effects__preview--phobos'
  ) {
    imageUploadPreviewElement.style.filter =
      'blur(' + effectLevelValueElement.value * 3 + 'px)';
  } else if (
    imageUploadPreviewElement.classList === 'effects__preview--heat'
  ) {
    imageUploadPreviewElement.style.filter =
      'brightness(' + effectLevelValueElement.value * 3 + ')';
  }
}

function outZoom() {
  var scaleSmaller = parseInt(scaleCntrolValue.value, 10) - STEP;
  if (scaleSmaller <= MIN_SCALE) {
    scaleSmaller = MIN_SCALE;
    scaleCntrolValue.value = MIN_SCALE + '%';
  } else {
    scaleCntrolValue.value = scaleSmaller + '%';
  }

  imageUploadPreviewElement.style.transform = 'scale(' + scaleSmaller / 100 + ')';
}

function inZoom() {
  var scaleBigger = parseInt(scaleCntrolValue.value, 10) + STEP;
  if (scaleBigger >= MAX_SCALE) {
    scaleBigger = MAX_SCALE;
    scaleCntrolValue.value = MAX_SCALE + '%';
  } else {
    scaleCntrolValue.value = scaleBigger + '%';
  }

  imageUploadPreviewElement.style.transform = 'scale(' + scaleBigger / 100 + ')';
}
