'use strict';

(function () {
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
  var AVATAR_QUANTITY = 6;
  var PHOTOS_QUANTITY = 25;
  var photosListElement = document.querySelector('.pictures');
  var photosCollection = createPhotosArray(PHOTOS_QUANTITY);
  var fragment = document.createDocumentFragment();
  var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  renderPhotos(photosCollection);

  function createAvatar(number) {
    return 'img/avatar-' + number + '.svg';
  }

  function createComments(number) {
    var comments = [];
    for (var i = 0; i <= number; i++) {
      comments.push({
        avatar: createAvatar(window.util.getRandomFromInterval(1, AVATAR_QUANTITY)),
        message: window.util.getElement(COMMENTS),
        name: window.util.getElement(NAMES)
      });
    }
    return comments;
  }

  function createPhotosArray(number) {
    var photosArray = [];
    for (var i = 1; i <= number; i++) {
      photosArray.push({
        url: 'photos/' + i + '.jpg',
        likes: window.util.getRandomFromInterval(15, 200),
        comments: createComments(window.util.getRandomFromInterval(1, 4)),
      });
    }
    return photosArray;
  }

  function renderPhotos(photos) {
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPhoto(photos[i]));
    }
    photosListElement.appendChild(fragment);
  }

  function renderPhoto(photo) {
    var photoElement = similarPictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').setAttribute('src', photo.url);
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return photoElement;
  }
})();
