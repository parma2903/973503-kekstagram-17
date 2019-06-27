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
    min: 0,
    max: 1,
    filter: 'grayscale',
  },
  'sepia': {
    value: '',
    min: 0,
    max: 1,
    filter: 'sepia',
  },
  'marvin': {
    value: '%',
    min: 0,
    max: 100,
    filter: 'invert',
  },
  'phobos': {
    value: 'px',
    min: 0,
    max: 3,
    filter: 'blur',
  },
  'heat': {
    value: '',
    min: 1,
    max: 3,
    filter: 'brightness',
  },
};

var fragment = document.createDocumentFragment();

var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var photosListElement = document.querySelector('.pictures');
var effectsRadio = document.querySelectorAll('.effects__radio');
var uploadInput = document.querySelector('#upload-file');
var uploadOverlay = document.querySelector('.img-upload__overlay');
var uploadOverlayCloseBt = document.querySelector('.img-upload__cancel');

var uploadForm = document.querySelector('#upload-select-image');
var effectDepth = uploadForm.querySelector('.effect-level__depth');
var levelPin = uploadForm.querySelector('.effect-level__pin');
var effectLevel = uploadForm.querySelector('.effect-level');
var effectLevelValueElement = effectLevel.querySelector('.effect-level__value');
var effectLevelLine = effectLevel.querySelector('.effect-level__line');

var uploadPreview = document.querySelector('.img-upload__preview');
var imageUploadPreviewElement = uploadPreview.querySelector('img');

var scaleControlSmaller = uploadOverlay.querySelector('.scale__control--smaller');
var scaleControlBigger = uploadOverlay.querySelector('.scale__control--bigger');
var scaleControlValue = uploadOverlay.querySelector('.scale__control--value');

var textDescription = document.querySelector('.text__description');

var photosCollection = createPhotosArray(PHOTOS_QUANTITY);

renderPhotos(photosCollection);

uploadInput.addEventListener('change', function () {
  openUploadOverlay();
  for (var i = 0; i < effectsRadio.length; i++) {
    effectsRadio[i].addEventListener('click', chooseEffect);
  }
});

uploadOverlayCloseBt.addEventListener('click', function () {
  closeUploadOverlay();
  for (var i = 0; i < effectsRadio.length; i++) {
    effectsRadio.removeEventListener('click', chooseEffect);
  }
});

levelPin.addEventListener('mouseup', function () {
  changeIntensityEffect();
});

levelPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoordsX = evt.clientX;

  function onMouseMove(moveEvt) {
    moveEvt.preventDefault();

    var shiftX = startCoordsX - moveEvt.clientX;
    startCoordsX = moveEvt.clientX;

    var pinElementLeft = levelPin.offsetLeft - shiftX;
    var lineElementLeft = effectLevelLine.getBoundingClientRect().left;
    var lineElementRight = effectLevelLine.getBoundingClientRect().right;
    if (startCoordsX <= lineElementLeft) {
      pinElementLeft = 0;
    } else if (startCoordsX >= lineElementRight) {
      pinElementLeft = effectLevelLine.clientWidth;
    }

    changePinValue(pinElementLeft);
  }

  function onMouseUp() {
    changeIntensityEffect();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

scaleControlSmaller.addEventListener('click', function () {
  outZoom();
});

scaleControlBigger.addEventListener('click', function () {
  inZoom();
});

textDescription.addEventListener('focus', function () {
  document.removeEventListener('keydown', onUploadOverlayEscPress);
});

textDescription.addEventListener('blur', function () {
  document.addEventListener('keydown', onUploadOverlayEscPress);
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
  effectsRadio[0].checked = true;
  effectLevel.classList.add('hidden');
  setZoomValue(100);

  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onUploadOverlayEscPress);
}

function closeUploadOverlay() {
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onUploadOverlayEscPress);
}

function chooseEffect(evt) {
  changeIntensityEffect();
  changePinValue(100);
  changeEffectClass(evt);
}

function changeEffectClass(evt) {
  var selectedEffect = evt.target.value;
  var effects = Object.keys(EFFECTS_SETTINGS);

  if (evt.target.value === 'none') {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }

  for (var i = 0; i < effects.length; i++) {
    imageUploadPreviewElement.classList.remove(EFFECTS_CLASS_PREFIX + effects[i]);
  }

  imageUploadPreviewElement.classList.add(EFFECTS_CLASS_PREFIX + selectedEffect);

  effectDepth.style.width = '100%';
  levelPin.style.left = '100%';
  effectLevelValueElement.value = 100;
}

function calculateValue(value, min, max) {
  var result = (parseInt(value, 10) / 100) * (max - min) + min;
  return result.toFixed(2);
}

function changePinValue(position) {
  var value = (position / effectLevelLine.clientWidth) * 100;
  effectDepth.style.width = value + '%';
  levelPin.style.left = value + '%';
  effectLevelValueElement.value = value;
}

function changeIntensityEffect() {
  var effect = document.querySelector('.effects__radio:checked').value;

  if (effect === 'none') {
    imageUploadPreviewElement.style.filter = '';
  } else {
    var selectedEffectSettings = EFFECTS_SETTINGS[effect];
    var effectType = selectedEffectSettings.filter;
    var effectValue = selectedEffectSettings.value;
    var effectMin = selectedEffectSettings.min;
    var effectMax = selectedEffectSettings.max;
    var calculatedValue = calculateValue(effectLevelValueElement.value, effectMin, effectMax);
    imageUploadPreviewElement.style.filter = effectType + '(' + calculatedValue + effectValue + ')';
  }
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
