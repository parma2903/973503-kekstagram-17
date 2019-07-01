'use strict';

(function () {
  var photosListElement = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var URL = 'https://js.dump.academy/kekstagram/data';

  window.backend.load(URL, renderPhotos);

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
