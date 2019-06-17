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
var photosQuantity = 25;

var similarPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
var photosListElement = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();

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
var photos = createPhotosArray(photosQuantity);

function renderPhoto(photo) {
  var photoElement = similarPictureTemplate.cloneNode(true);
  var comments = photo.comments;
  photoElement.querySelector('.picture__img').setAttribute('src', photo.url);
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  for (var i = 0; i < comments.length; i++) {
    var comment = comments[i];
    photoElement.querySelector('.picture__comments').textContent = photo.comments;
  }
  return photoElement;
};

for (var i = 0; i < photos.length; i++) {
  fragment.appendChild(renderPhoto(photos[i]));
}
photosListElement.appendChild(fragment);
