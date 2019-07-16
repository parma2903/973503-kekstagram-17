'use strict';

(function () {
  var FILTER_ACTIVE_CLASS = 'img-filters__button--active';
  var NEW_PHOTOS_COUNT = 10;

  var filters = document.querySelector('.img-filters');

  function compareRandom() {
    return Math.random() - 0.5;
  }

  function compareComments(a, b) {
    return b.comments.length - a.comments.length;
  }

  function setActiveButton(target) {
    filters.querySelector('.' + FILTER_ACTIVE_CLASS).classList.remove(FILTER_ACTIVE_CLASS);
    target.classList.add(FILTER_ACTIVE_CLASS);
  }

  var applyFilter = window.util.debounce(function (arrPhotos, filterId) {
    var newPhotos = arrPhotos;

    switch (filterId) {
      case 'filter-new':
        newPhotos = arrPhotos.slice().sort(compareRandom).slice(0, NEW_PHOTOS_COUNT);
        break;
      case 'filter-discussed':
        newPhotos = arrPhotos.slice().sort(compareComments);
        break;
    }

    window.gallery.render(newPhotos);
  });

  function init(arrPhotos) {
    filters.classList.remove('img-filters--inactive');
    filters.querySelector('.img-filters__form').addEventListener('click', function (evt) {
      if (evt.target.classList.contains('img-filters__button')) {
        setActiveButton(evt.target);
        applyFilter(arrPhotos, evt.target.id);
      }
    });
  }

  window.filters = {
    init: init
  };
})();
