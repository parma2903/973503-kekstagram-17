'use strict';

(function () {
  var photosListElement = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var filters = document.querySelector('.img-filters');

  function renderPhotos(photos) {
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPhoto(photos[i]));
    }

    var pictureElements = photosListElement.querySelectorAll('.picture');

    for (i = 0; i < pictureElements.length; i++) {
      photosListElement.removeChild(pictureElements[i]);
    }

    photosListElement.appendChild(fragment);
    filters.classList.remove('img-filters--inactive');
  }

  function renderPhoto(photo) {
    var photoElement = similarPictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').setAttribute('src', photo.url);
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return photoElement;
  }

  window.backend.load(function (arrPhotos) {
    renderPhotos(arrPhotos);
    window.filters.init(arrPhotos);
  });

  window.gallery = {
    render: renderPhotos
  };
})();
