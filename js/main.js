'use strict';

var similarPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
var photosListElement = document.querySelector('.pictures');
var photosQuantity = 25;
var photos = [];
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

function getElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createPhotoArray(number) {
  for (var i = 1; i <= number; i++) {
    photos.push({
      avatar: 'photos/' + i + '.jpg',
      likes: getRandomFromInterval(15, 200),
      message: getElement(COMMENTS),
//по заданию тут должен быть массив из нескольких комментариев. Я не знаю как сюда массив поставить
      name: getElement(NAMES)
    });
  }
  return photos;
};
createPhotoArray(photosQuantity);

var renderPhotos = function() { //не знаю, какой аргумент передавать в эту функцию
  var photoElement = similarPictureTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').setAttribute ('src', photos.avatar);
  photoElement.querySelector('.picture__likes').textContent = photos.likes;
  photoElement.querySelector('.picture__comments').textContent = photos.comments;
  //куда вставлять names??

  return photoElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < photos.length; i++) {
  fragment.appendChild(renderPhotos(photos[i]));
}
photosListElement.appendChild(fragment);

