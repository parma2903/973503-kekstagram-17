'use strict';

(function () {
  var photosListElement = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var filters = document.querySelector('.img-filters');
  var URL = 'https://js.dump.academy/kekstagram/data';

  window.backend.load(URL, renderPhotos);

  function renderPhotos(photos) {
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPhoto(photos[i]));
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

  var pics = [];

  var filterForm = document.querySelector('.img-filters__form');
  var filterPopular = filterForm.querySelector('#filter-popular');
  var filterNew = filterForm.querySelector('#filter-new');
  var filterDisc = filterForm.querySelector('#filter-discussed');

  filterPopular.addEventListener('click', onPopularClickHandler);
  filterNew.addEventListener('click', onNewClickHandler);
  filterDisc.addEventListener('click', onDiscClickHandler);

  function onPopularClickHandler() {
    renderPhotos(pics);
  }

  function onNewClickHandler() {
    var filtered = pics.slice().sort(function () {
      return Math.random() - 0.5;
    }).slice(0, 10);
    renderPhotos(filtered);
  }

  function onDiscClickHandler() {
    var filtered = pics.slice().sort(function (a, b) {
      if (a.comments.length > b.comments.length) {
        return -1;
      }
      if (a.comments.length < b.comments.length) {
        return 1;
      }
      return 0;
    });
    renderPhotos(filtered);
  }

  function onfiltersClick(evt) {
    window.util.debounce(evt);
  }

  filterForm.addEventListener('click', onfiltersClick);
})();
