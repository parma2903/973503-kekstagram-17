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
var avatarQuantity = 6;

var similarPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
var photosListElement = document.querySelector('.pictures');
var photosQuantity = 25;
var fragment = document.createDocumentFragment();

function getElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createAvatar(number) {
  for (var i = 1; i <= number; i++) {
    var avatar = 'img/avatar-' + i + '.svg';
  }
  return avatar;
}

function createComments(number) {
  var comments = [];
  for (var i = 0; i <= number; i++) {
    comments.push({
      avatar: createAvatar(avatarQuantity),
      message: getElement(COMMENTS),
      name: getElement(NAMES)
    });
  }
}

function createPhotosArray(number) {
  var photosArray = [];
  for (var i = 1; i <= number; i++) {
    photosArray.push({
      url: 'photos/' + i + '.jpg',
      likes: getRandomFromInterval(15, 200),
      comments: createComments(4),
    });
  }
  return photosArray;
}
var photos = createPhotosArray(photosQuantity);

var renderPhotos = function () {
  var photoElement = similarPictureTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').setAttribute('src', photos.avatar);
  photoElement.querySelector('.picture__likes').textContent = photos.likes;
  photoElement.querySelector('.picture__comments').textContent = photos.comments;

  return photoElement;
};

for (var i = 0; i < photos.length; i++) {
  fragment.appendChild(renderPhotos(photos[i]));
}
photosListElement.appendChild(fragment);
