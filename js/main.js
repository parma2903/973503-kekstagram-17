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
var ZOOM_MIN_SCALE = 0;
var ZOOM_MAX_SCALE = 100;
var ZOOM_STEP = 25;

var AVATAR_QUANTITY = 6;
var PHOTOS_QUANTITY = 25;
/*  var EFFECTS = [
  'effects__preview--none',
  'effects__preview--chrome',
  'effects__preview--sepia',
  'effects__preview--marvin',
  'effects__preview--phobos',
  'effects__preview--heat'
];*/

var EFFECTS_CLASS_PREFIX = 'effects__preview--';
var EFFECTS_SETTINGS = {
  'none': {
    value: '',
    min: '',
    max: '',
    filter: '',
  },
  'chrome': {
    value: '',
    min: '0',
    max: '1',
    filter: 'grayscale',
  },
  'sepia': {
    value: '',
    min: '0',
    max: '1',
    filter: 'sepia',
  },
  'marvin': {
    value: '%',
    min: '0',
    max: '100',
    filter: 'invert',
  },
  'phobos': {
    value: 'px',
    min: '0',
    max: '3',
    filter: 'blur',
  },
  'heat': {
    value: '',
    min: '1',
    max: '3',
    filter: 'brightness',
  },
};

var fragment = document.createDocumentFragment();

var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var photosListElement = document.querySelector('.pictures');
var effectRadio = document.querySelectorAll('.effects__radio');
var uploadInput = document.querySelector('#upload-file');
var uploadOverlay = document.querySelector('.img-upload__overlay');
var uploadOverlayCloseBt = document.querySelector('.img-upload__cancel');

var uploadForm = document.querySelector('#upload-select-image');
var effectDepth = uploadForm.querySelector('.effect-level__depth');
var levelPin = uploadForm.querySelector('.effect-level__pin');
var effectLevel = uploadForm.querySelector('.effect-level');
/* var effectLevelValueElement = effectLevel.querySelector('.effect-level__value');*/

var uploadPreview = document.querySelector('.img-upload__preview');
var imageUploadPreviewElement = uploadPreview.querySelector('img');

var scaleControlSmaller = uploadOverlay.querySelector('.scale__control--smaller');
var scaleControlBigger = uploadOverlay.querySelector('.scale__control--bigger');
var scaleControlValue = uploadOverlay.querySelector('.scale__control--value');

var photosCollection = createPhotosArray(PHOTOS_QUANTITY);

setZoomValue(100);
renderPhotos(photosCollection);

uploadInput.addEventListener('change', function () {
  openUploadOverlay();
  for (var i = 0; i < effectRadio.length; i++) {
    effectRadio[i].addEventListener('click', chooseEffect);
  }
});

uploadOverlayCloseBt.addEventListener('click', function () {
  closeUploadOverlay();
  for (var i = 0; i < effectRadio.length; i++) {
    effectRadio.removeEventListener('click', chooseEffect);
  }
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
      avatar: createAvatar(getRandomFromInterval(1, AVATAR_QUANTITY)),
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
  var selectedEffect = evt.target.value;
  var effects = Object.keys(EFFECTS_SETTINGS);
  /*  currentEffect = selectedEffect;*/

  if (evt.target.value === 'none') {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }

  for (var i = 0; i < effects.length; i++) {
    uploadPreview.classList.remove(EFFECTS_CLASS_PREFIX + effects[i]);
  }

  uploadPreview.classList.add(EFFECTS_CLASS_PREFIX + selectedEffect);

  effectDepth.style.width = 0;
  levelPin.style.left = 0;
}

function changeIntensityEffect() {
  var effect = document.querySelector('.effects__radio[checked]').value;
  var selectedEffectSettings = EFFECTS_SETTINGS[effect];
  var effectType = selectedEffectSettings.type;
  var effectValue = selectedEffectSettings.value;
  var calculatedValue = 0;

  imageUploadPreviewElement.style.filter =
    effectType + '(' + calculatedValue + effectValue + ')';
}

function outZoom() {
  var scaleSmaller = parseInt(scaleControlValue.value, 10) - ZOOM_STEP;
  if (scaleSmaller <= ZOOM_MIN_SCALE) {
    scaleSmaller = ZOOM_MIN_SCALE;
    setZoomValue(ZOOM_MIN_SCALE);
  } else {
    setZoomValue(scaleSmaller);
  }

  imageUploadPreviewElement.style.transform = 'scale(' + scaleSmaller / 100 + ')';
}

function inZoom() {
  var scaleBigger = parseInt(scaleControlValue.value, 10) + ZOOM_STEP;
  if (scaleBigger >= ZOOM_MAX_SCALE) {
    scaleBigger = ZOOM_MAX_SCALE;
    setZoomValue(ZOOM_MAX_SCALE);
  } else {
    setZoomValue(scaleBigger);
  }

  imageUploadPreviewElement.style.transform = 'scale(' + scaleBigger / 100 + ')';
}

function setZoomValue(value) {
  scaleControlValue.value = value + '%';
}
